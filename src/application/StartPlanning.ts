import { BalanceCalculator } from "../domain/entity/BalanceCalculator";
import Planning from "../domain/entity/Planning";
import PlanningMonth from "../domain/entity/PlanningMonth";
import PlanningMonthItem from "../domain/entity/PlanningMonthItem";
import { PlanningStatus } from "../domain/entity/PlanningStatus";
import PlanningRepository from "../domain/repository/PlanningRepository";

export default class StartPlanning {
  constructor(readonly planningRepository: PlanningRepository) {}

  async execute(input: InputCreate): Promise<void> {
    let balancePlanning = 0;
    const planning = new Planning(
      input.year,
      PlanningStatus.ACTIVE,
      input.title,
      input.expectedAmount,
      input.startAt,
      input.endAt
    );
    if (input.months) {
      for (const month of input.months) {
        const planningMonth = new PlanningMonth(
          month.idMonth,
          month.spentOnDebit,
          month.spentOnCredit,
          month.totalIn,
          month.totalOut,
          month.creditStatus
        );
        if (month.items) {
          for (const item of month.items) {
            planningMonth.addItem(
              new PlanningMonthItem(
                item.value,
                item.operation,
                item.date,
                item.description,
                item.idType,
                item.idCard,
                undefined,
                item.paymentMethod,
                item.isInvestiment
              )
            );
          }
        }
        planningMonth.balance = BalanceCalculator.CalculateMonthBalance(
          planningMonth.getItens()
        );
        balancePlanning += planningMonth.balance;
        planning.addMonth(planningMonth);
      }
    }
    planning.balance = balancePlanning;
    await this.planningRepository.save(planning);
  }
}

type InputCreate = {
  startAt: Date;
  endAt: Date;
  title: string;
  year: number;
  expectedAmount: number;
  months: {
    idMonth: number;
    totalIn: number;
    totalOut: number;
    spentOnCredit: number;
    spentOnDebit: number;
    creditStatus: number;
    items: {
      value: number;
      operation: "in" | "out";
      date: string;
      paymentMethod: "debit" | "credit" | null;
      description: string;
      idType: number;
      idCard: number;
      isInvestiment: boolean;
    }[];
  }[];
};
