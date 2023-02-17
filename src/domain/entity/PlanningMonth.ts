import PlanningMonthItem from "./PlanningMonthItem";

export default class PlanningMonth {
  items: PlanningMonthItem[];
  typesSpent: { value: number, description: string, operation: "in"| "out", type?: number } [] = [];
  balance = 0;
  constructor(
    readonly idMonth: number,
    readonly expectedAmount: number,
    readonly spentOnDebit: number,
    readonly spentOnCredit: number,
    readonly totalIn: number,
    readonly totalOut: number,
    readonly idPlanning?: number,
    readonly open: boolean = true,
    readonly id?: number
  ) {
    this.items = [];
  }

  addItem(item:PlanningMonthItem) {
    this.items.push(item);
  }

  getItens() {
    return this.items;
  }
}
