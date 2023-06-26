import MonthBudget from "../domain/entity/MonthBudget";
import MonthBudgetRepository from "../domain/repository/MonthBudgetRepository";
export default class GoalsService {
  constructor(
    readonly monthBudgetRepository: MonthBudgetRepository
  ) {}

  async execute({ budgets }: Input): Promise<void> {
    const promises: Array<Promise<void>> = [];
    const bugdegtsCreate = budgets
      .filter((item) => !item.isOnDB)
      .map(
        (item) => new MonthBudget(item.type, item.planningMonth, item.amount)
      );


    bugdegtsCreate.forEach((budget) =>
      promises.push(this.monthBudgetRepository.insert!(budget))
    );
    const budgetsUpdate = budgets.filter(item => item.isOnDB).map((item) => new MonthBudget(item.type, item.planningMonth, item.amount))
    budgetsUpdate.forEach(budget => promises.push(this.monthBudgetRepository.rawUpdate!(budget)))
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
};
