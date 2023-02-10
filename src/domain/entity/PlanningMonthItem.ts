export default class PlanningMonthItem {
  constructor(
    readonly value: number,
    readonly operation: "in" | "out",
    readonly date: Date,
    readonly description: string,
    readonly idType: number,
    readonly idPlanningMonth?: number,
    readonly idCard?: number,
    readonly paymentMethod: "debit" | "credit" | null = null,
    readonly id?: number
  ) {}
}
