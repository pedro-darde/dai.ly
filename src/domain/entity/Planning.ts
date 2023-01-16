import PlanningMonth from "./PlanningMonth";

export default class Planning {
  private planningMonths: PlanningMonth[];
  constructor(
    readonly year: number,
    readonly status: number,
    readonly title: string,
    readonly expectedAmount: number,
    readonly startAt: Date = new Date(),
    readonly endAt: Date | null = null
  ) {
    this.planningMonths = [];
  }

  addMonth(month: number, monthTitle: number) {}
}
