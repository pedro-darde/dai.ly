import PlanningMonth from "./PlanningMonth";

export default class Planning {
  private planningMonths: PlanningMonth[];
  balance = 0;
  constructor(
    readonly year: number,
    readonly status: number,
    readonly title: string,
    readonly expectedAmount: number,
    readonly startAt: Date = new Date(),
    readonly endAt: Date | null = null,
    readonly id?: number
  ) {
    this.planningMonths = [];
  }

  addMonth(planningMonth: PlanningMonth) {
    this.planningMonths.push(planningMonth)
  }

  getMonths() {
    return this.planningMonths
  }
}
