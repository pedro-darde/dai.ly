import PlanningMonthItem from "./PlanningMonthItem"

export default class PlanningMonth {
  private items: PlanningMonthItem[]
  balance = 0
  spentOnDebit = 0;
  spentOnCredit = 0;
  constructor(readonly idMonth: number) {
    this.items = []
  }

  addItem(value: number, operation: "in" | "out", date: Date, paymentMethod: "credit" | "debit" | null) {
      this.items.push(new PlanningMonthItem(value, operation, date, paymentMethod))
  }

  getItens() {
    return this.items
  }

}
