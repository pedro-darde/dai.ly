type PlanningMonthItemAttributes = Omit<
  PlanningMonthItem,
  keyof PlanningMonthItemMethods
>;
type PlanningMonthItemMethods = {
  [K in keyof PlanningMonthItem]: PlanningMonthItem[K] extends Function
    ? K
    : never;
}[keyof PlanningMonthItem];

export default class PlanningMonthItem {
  constructor(
    readonly value: number,
    readonly operation: "in" | "out",
    readonly date: string,
    readonly description: string,
    readonly idType: number,
    readonly idPlanningMonth?: number,
    readonly idCard?: number,
    readonly paymentMethod: "debit" | "credit" | null = null,
    readonly isInvestiment: boolean = false,
    readonly id?: number
  ) {}

  static createFromObject(
    data: PlanningMonthItemAttributes
  ): PlanningMonthItem {
    return new PlanningMonthItem(
      data.value,
      data.operation,
      data.date,
      data.description,
      data.idType,
      data.idPlanningMonth,
      data.idCard,
      data.paymentMethod!,
      data.isInvestiment,
      data.id
    );
  }
}
