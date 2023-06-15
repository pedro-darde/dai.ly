import PlanningMonth from "./PlanningMonth";
import PlanningMonthItem from "./PlanningMonthItem";

export default class SpentCalculator {
  static CalculateForPaymentMethod(items: PlanningMonthItem[]) {
    const debitSpents = items.filter((item) => item.paymentMethod === "debit");
    const creditSpents = items.filter(
      (item) => item.paymentMethod === "credit"
    );

    return {
      onDebit: debitSpents.reduce((acc, item) => (acc += item.value), 0),
      onCredit: creditSpents.reduce((acc, { value }) => (acc += value), 0),
    };
  }

  static CalculateForYear(items: PlanningMonth[]) {
    return {
      onDebit: items.reduce((acc, item) => (acc += item.spentOnDebit), 0),
      onCreditt: items.reduce((acc, item) => (acc += item.spentOnCredit), 0),
    };
  }

  static CalculateSpentOnCredit(items: PlanningMonthItem[]) {
    return items
      .filter((item) => item.paymentMethod === "credit")
      .reduce((acc, item) => (acc += item.value), 0);
  }
}
