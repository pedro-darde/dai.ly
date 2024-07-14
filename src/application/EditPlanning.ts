import { BalanceCalculator } from "../domain/entity/BalanceCalculator";
import Planning from "../domain/entity/Planning";
import PlanningMonth from "../domain/entity/PlanningMonth";
import PlanningMonthItem from "../domain/entity/PlanningMonthItem";
import PlanningMonthItemRepository from "../domain/repository/PlanningMonthItemRepository";
import PlanningMonthRepository from "../domain/repository/PlanningMonthRepository";
import PlanningRepository from "../domain/repository/PlanningRepository";
import DateHandler from "../infra/date/DateHandler";

export default class EditPlanning {
  constructor(
    readonly planningRepository: PlanningRepository,
    readonly planningMonthRepository: PlanningMonthRepository,
    readonly planningMonthItemRepository: PlanningMonthItemRepository,
    readonly dateHandler: DateHandler
  ) {}
  async execute(year: number, input: Input): Promise<void> {
    try {
      await this.planningRepository.beginTransaction();
      if (input.itemsToRemove.length)
        await this.planningMonthItemRepository.bulkDelete(input.itemsToRemove);
      if (input.monthsToRemove.length)
        await this.planningMonthRepository.bulkDelete(input.monthsToRemove);
      let totalBalancePlanning = 0;
      const { toAdd, toUpdate } = input.months;

      if (toAdd.length) {
        for (const month of toAdd) {
          const planningMonth = new PlanningMonth(
            month.idMonth,
            month.spentOnDebit,
            month.spentOnCredit,
            month.totalIn,
            month.totalOut,
            month.creditStatus,
            input.id,
            true
          );
          planningMonth.balance += BalanceCalculator.CalculateMonthBalance(
            month.items.toAdd
          );
          totalBalancePlanning += planningMonth.balance;
          const idPlanningMonth = await this.planningMonthRepository.create(
            planningMonth
          );
          if (month.items.toAdd.length) {
            const monthItems: PlanningMonthItem[] = month.items.toAdd.map(
              (item) => ({
                ...item,
                idPlanningMonth: +idPlanningMonth,
              })
            );
            await this.planningMonthItemRepository.bulkInsert(monthItems);
          }
        }
      }

      if (toUpdate.length) {
        for (const month of toUpdate) {
          const {
            items: { toAdd: itemsToAdd, toUpdate: itemsToUpdate },
          } = month;
          const planningMonth = new PlanningMonth(
            month.idMonth,
            month.spentOnDebit,
            month.spentOnCredit,
            month.totalIn,
            month.totalOut,
            month.creditStatus,
            input.id,
            true,
            month.id
          );
          planningMonth.balance += BalanceCalculator.CalculateMonthBalance([
            ...itemsToAdd,
            ...itemsToUpdate,
          ]);
          totalBalancePlanning += planningMonth.balance;
          await this.planningMonthRepository.edit(
            planningMonth.id!,
            planningMonth
          );
          if (itemsToUpdate.length)
            await this.planningMonthItemRepository.bulkUpdate(itemsToUpdate);
          if (itemsToAdd.length)
            await this.planningMonthItemRepository.bulkInsert(itemsToAdd);
        }
      }

      const planning = new Planning(
        year,
        input.status,
        input.title,
        input.expectedAmount,
        input.startAt,
        input.endAt
      );
      planning.balance = totalBalancePlanning;
      await this.planningRepository.update(planning);
      await this.planningRepository.commitTransaction();
    } catch (e) {
      await this.planningRepository.rollbackTransaction();
      throw e;
    }
  }

  async createMoviment({ item, planning }: InputCreateMoviment) {
    console.log({ item });
    const itemDate = this.dateHandler.createFromFormat(item.date);

    console.log({ itemDate});

    const month = itemDate.getMonth() + 1;

    let idPlanningMonth =
      await this.planningMonthRepository.getByPlanningAndMonth(planning, month);

    if (!idPlanningMonth) {
      const planningMonth = new PlanningMonth(
        month,
        0,
        0,
        0,
        0,
        0,
        planning,
        false
      );
      idPlanningMonth = await this.planningMonthRepository.create(
        planningMonth
      );
    }

    const monthItem = PlanningMonthItem.createFromObject({
      date: item.date,
      description: item.description,
      idType: item.idType,
      operation: item.operation,
      paymentMethod: item.paymentMethod,
      value: item.value,
      idCard: item.idCard,
      idPlanningMonth: idPlanningMonth,
      isInvestiment: item.isInvestiment,
    });

    await this.planningMonthItemRepository.create(monthItem);
  }

  async editMoviment({ item }: InputEditMoviment) {
    await this.planningMonthItemRepository.bulkUpdate([item]);
  }
}

type InputCreateMoviment = {
  item: ItemInput;
  planning: number;
};

type InputEditMoviment = {
  item: ItemInput & { id: number };
  planning: number;
};

type ItemInput = {
  idType: number;
  value: number;
  operation: "in" | "out";
  date: string;
  paymentMethod: "debit" | "credit" | null;
  description: string;
  idCard?: number;
  isInvestiment: boolean;
};

type ToAddOrUpdateMonths = {
  toAdd: {
    idMonth: number;
    totalIn: number;
    totalOut: number;
    spentOnCredit: number;
    spentOnDebit: number;
    creditStatus: number;
    items: {
      toAdd: ItemInput[];
    };
  }[];
  toUpdate: {
    id: number;
    idMonth: number;
    totalIn: number;
    totalOut: number;
    spentOnCredit: number;
    spentOnDebit: number;
    creditStatus: number;
    items: {
      toAdd: {
        idPlanningMonth: number;
        value: number;
        idType: number;
        operation: "in" | "out";
        date: string;
        paymentMethod: "debit" | "credit" | null;
        description: string;
        isInvestiment: boolean;
      }[];
      toUpdate: {
        idPlanningMonth: number;
        id: number;
        idType: number;
        value: number;
        operation: "in" | "out";
        date: string;
        paymentMethod: "debit" | "credit" | null;
        description: string;
        idCard?: number;
        isInvestiment: boolean;
      }[];
    };
  }[];
};

type Input = {
  status: number;
  id: number;
  monthsToRemove: number[];
  itemsToRemove: number[];
  startAt: Date;
  endAt: Date;
  title: string;
  year: number;
  expectedAmount: number;
  months: ToAddOrUpdateMonths;
};
