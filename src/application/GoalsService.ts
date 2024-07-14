import MonthBudget from "../domain/entity/MonthBudget";
import Planning from "../domain/entity/Planning";
import PlanningMonth from "../domain/entity/PlanningMonth";
import MonthBudgetRepository from "../domain/repository/MonthBudgetRepository";
import PlanningMonthRepository from "../domain/repository/PlanningMonthRepository";
export default class GoalsService {
  constructor(
    readonly monthBudgetRepository: MonthBudgetRepository,
    readonly planningMonthRepository: PlanningMonthRepository
  ) {}

  async execute({
    budgets,
    planning,
    idPlanningMonth,
    idMonth,
  }: Input): Promise<void> {
    if (!idPlanningMonth) {
      const planningMonth = new PlanningMonth(
        idMonth,
        0,
        0,
        0,
        0,
        0,
        planning.id,
        false
      );
      idPlanningMonth = await this.planningMonthRepository.create!(
        planningMonth
      );
    }

    const promises: Array<Promise<void>> = [];
    const bugdegtsCreate = budgets
      .filter((item) => !item.isOnDB)
      .map((item) => new MonthBudget(item.type, idPlanningMonth!, item.amount));

    bugdegtsCreate.forEach((budget) =>
      promises.push(this.monthBudgetRepository.insert!(budget))
    );

    const budgetsUpdate = budgets
      .filter((item) => item.isOnDB)
      .map((item) => new MonthBudget(item.type, idPlanningMonth!, item.amount));
    budgetsUpdate.forEach((budget) =>
      promises.push(this.monthBudgetRepository.rawUpdate!(budget))
    );
    await Promise.all(promises);
  }
}

type Input = {
  budgets: Array<{
    type: number;
    planningMonth: number;
    amount: number;
    isOnDB: boolean;
  }>;
  planning: {
    id: number;
  };
  idPlanningMonth?: number;
  idMonth: number;
};
