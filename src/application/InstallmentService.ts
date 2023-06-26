import PlanningMonth from "../domain/entity/PlanningMonth";
import PlanningMonthItem from "../domain/entity/PlanningMonthItem";
import PlanningMonthItemRepository from "../domain/repository/PlanningMonthItemRepository";
import PlanningMonthRepository from "../domain/repository/PlanningMonthRepository";

export default class InstallMentservice {
  constructor(
    readonly planningMonthItemRepository: PlanningMonthItemRepository,
    readonly planningMonthRepository: PlanningMonthRepository
  ) {}
  async execute(input: Input) {
    try {
      const { willCreateOnlyItems, willCreateOnlyPlanningMonth } = input;
      if (willCreateOnlyItems.length) {
        await this.planningMonthItemRepository.bulkInsert(willCreateOnlyItems);
      }
      if (willCreateOnlyPlanningMonth.length) {
        const months = [];
        for await (const monthItem of willCreateOnlyPlanningMonth) {
          const planningMonth = new PlanningMonth(
            monthItem.month,
            0,
            monthItem.value,
            0,
            monthItem.value,
            0,
            monthItem.planning
          );
          planningMonth.addItem(
            new PlanningMonthItem(
              monthItem.value,
              monthItem.operation,
              monthItem.date,
              monthItem.description,
              monthItem.idType,
              undefined,
              monthItem.idCard,
              monthItem.paymentMethod
            )
          );
          months.push(planningMonth);
        }
        await this.planningMonthRepository.createMultipleWithItems(months);
      }
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  }
}

type ItemInput = {
  description: string;
  value: number;
  date: Date;
  month: number;
  idType: number;
  paymentMethod: "debit" | "credit";
  operation: "in" | "out";
  year: number;
  planning?: number;
  idPlanningMonth?: number;
  idCard?: number;
};

type Input = {
  willCreateOnlyPlanningMonth: ItemInput[];
  willCreateOnlyItems: ItemInput[];
};
