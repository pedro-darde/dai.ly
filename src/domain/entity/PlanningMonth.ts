import MonthBudget from "./MonthBudget";
import PlanningMonthItem from "./PlanningMonthItem";
export type TypeSpent = {
  value: number;
  description: string;
  operation: "in" | "out";
  type?: number;
  children?: TypeSpent[];
};
export default class PlanningMonth {
  items: PlanningMonthItem[];
  typesSpent: TypeSpent[] = [];
  budgets?: MonthBudget[] = [];
  balance = 0;
  constructor(
    readonly idMonth: number,
    readonly spentOnDebit: number,
    readonly spentOnCredit: number,
    readonly totalIn: number,
    readonly totalOut: number,
    readonly creditStatus: number,
    readonly idPlanning?: number,
    readonly open: boolean = true,

    readonly id?: number
  ) {
    this.items = [];
  }

  addItem(item: PlanningMonthItem) {
    this.items.push(item);
  }

  getItens() {
    return this.items;
  }

  withBudgets(budgets: MonthBudget[]) {
    this.budgets = budgets;
  }
}
