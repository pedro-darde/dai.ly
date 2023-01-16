import PlanningMonthItem from "./PlanningMonthItem";

export class BalanceCalculator {
    static CalculateMonthBalance(items: PlanningMonthItem[]) {
        return items.reduce((acc, item) => {
            if (item.operation === "in") {
                acc += item.value
            } else {
                acc -= item.value
            }
            return acc;
        }, 0)
    }
}