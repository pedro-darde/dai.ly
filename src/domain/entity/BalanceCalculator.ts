import PlanningMonth from "./PlanningMonth";
import PlanningMonthItem from "./PlanningMonthItem";

export class BalanceCalculator {
  static CalculateMonthBalance(items: PlanningMonthItem[]) {
    return items
      .filter((item) => item.paymentMethod !== "credit")
      .reduce((acc, item) => {
        if (item.operation === "in") {
          acc += item.value;
        } else {
          acc -= item.value;
        }
        return acc;
      }, 0);
  }

  static CalculatePlanningBalance(months: PlanningMonth[]) {
    return months.reduce((acc, month) => {
      acc += BalanceCalculator.CalculateMonthBalance(month.items);
      return acc;
    }, 0);
  }
}
