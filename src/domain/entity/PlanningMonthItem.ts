export default class PlanningMonthItem {
    constructor(readonly value: number, readonly operation: "in" | "out", readonly date: Date, readonly paymentMethod: "debit" | "credit" | null = null) {} 
}