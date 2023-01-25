import PlanningMonthItemRepository from "../domain/repository/PlanningMonthItemRepository"
import PlanningMonthRepository from "../domain/repository/PlanningMonthRepository"
import PlanningRepository from "../domain/repository/PlanningRepository"

export default class EditPlanning {
    constructor(
        readonly planningRepository: PlanningRepository, 
        readonly planningMonthRepository: PlanningMonthRepository, 
        readonly planningMonthItemRepository: PlanningMonthItemRepository
    ) {}
    async execute(input: Input): Promise<void> {
        if (input.itemsToRemove.length) await this.planningMonthItemRepository.bulkDelete(input.itemsToRemove)
        if (input.monthsToRemove.length) await this.planningMonthRepository.bulkDelete(input.monthsToRemove)
            

    }
}


type Input = {
    monthsToRemove: number[],
    itemsToRemove: number[],
    planningStart: Date,
    planningEnd: Date,
    title: string,
    year: number,
    expectedAmount: number,
    months: {
        expectedAmount: number,
        idMonth: number,
        totalIn: number,
        totalOut: number,
        spentOnCredit: number,
        spentOnDebit: number,
        items: {
            value: number,
            operation: "in" | "out",
            date: Date,
            paymentMethod: "debit" | "credit" | null,
            description: string
        }[]
    }[]
}