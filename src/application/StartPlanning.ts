import { BalanceCalculator } from "../domain/entity/BalanceCalculator";
import Planning from "../domain/entity/Planning";
import PlanningMonth from "../domain/entity/PlanningMonth";
import { PlanningStatus } from "../domain/entity/PlanningStatus";
import PlanningMonthRepository from "../domain/repository/PlanningMonthRepository";
import PlanningRepository from "../domain/repository/PlanningRepository";

export default class StartPlanning {
    constructor(readonly planningRepository: PlanningRepository) {}

    async execute(input: InputCreate): Promise<void> {
        let balancePlanning = 0;
        const planning = new Planning(input.year,PlanningStatus.ACTIVE, input.planningTitle, input.expectedAmount, input.planningStart, input.planningEnd)
        if (input.months) {
            for (const month of input.months) {
                const planningMonth = new PlanningMonth(month.idMonth)
                if (month.items) {
                    for (const item of month.items) {
                        planningMonth.addItem(item.value, item.operation, item.date, item.paymentMethod)
                    }
                }
                planningMonth.balance = BalanceCalculator.CalculateMonthBalance(planningMonth.getItens())
                balancePlanning += planningMonth.balance
                planning.addMonth(planningMonth)
            }
        }
        planning.balance = balancePlanning
        await this.planningRepository.save(planning)
    }
}


type InputCreate = {
    planningStart: Date,
    planningEnd: Date,
    planningTitle: string,
    year: number,
    expectedAmount: number,
    months: {
        idMonth: number,
        items: {
            value: number,
            operation: "in" | "out",
            date: Date,
            paymentMethod: "debit" | "credit" | null
        }[]
    }[]
}