export default class MonthBudget {
  constructor(
    readonly type: number,
    readonly planningMonth: number,
    readonly amount: number,
  ) {}
}
