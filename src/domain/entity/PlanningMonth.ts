import PlanningMonthItem from "./PlanningMonthItem"

export default class PlanningMonth {
  private items: PlanningMonthItem[]
  balance = 0
  constructor(
              readonly idMonth: number, 
              readonly expectedAmount: number, 
              readonly spentOnDebit: number, 
              readonly spentOnCredit: number,
              readonly totalIn: number,
              readonly totalOut: number,
              readonly open: boolean = true) {
    this.items = []
  }

  addItem(value: number, operation: "in" | "out", date: Date, description: string, paymentMethod: "credit" | "debit" | null) {
      this.items.push(new PlanningMonthItem(value, operation, date,  description, paymentMethod))
  }

  getItens() {
    return this.items
  }

}
