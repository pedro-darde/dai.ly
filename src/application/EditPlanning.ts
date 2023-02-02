import { BalanceCalculator } from "../domain/entity/BalanceCalculator"
import Planning from "../domain/entity/Planning"
import PlanningMonth from "../domain/entity/PlanningMonth"
import BaseRepository from "../domain/repository/BaseRepository"
import PlanningMonthItemRepository from "../domain/repository/PlanningMonthItemRepository"
import PlanningMonthRepository from "../domain/repository/PlanningMonthRepository"
import PlanningRepository from "../domain/repository/PlanningRepository"

export default class EditPlanning {
    constructor(
        readonly planningRepository: PlanningRepository, 
        readonly planningMonthRepository: PlanningMonthRepository, 
        readonly planningMonthItemRepository: PlanningMonthItemRepository
    ) {}
    async execute(year: number, input: Input): Promise<void> {
        try {
            await this.planningRepository.beginTransaction()
            if (input.itemsToRemove.length) await this.planningMonthItemRepository.bulkDelete(input.itemsToRemove)
            if (input.monthsToRemove.length) await this.planningMonthRepository.bulkDelete(input.monthsToRemove)
            let totalBalancePlanning = 0
            const { toAdd, toUpdate } = input.months
            
            if (toAdd.length) {
                const monthsToInsert: PlanningMonth[] = []
                for (const month of toAdd) {
                    const planningMonth = new PlanningMonth(month.idMonth, month.expectedAmount, month.spentOnDebit, month.spentOnCredit, month.totalIn, month.totalOut, true)
                    planningMonth.balance += BalanceCalculator.CalculateMonthBalance(month.items.toAdd) 
                    totalBalancePlanning += planningMonth.balance
                    monthsToInsert.push(planningMonth)
                    if (month.items.toAdd.length) await this.planningMonthItemRepository.bulkInsert(month.items.toAdd)
                }
                await this.planningMonthRepository.bulkInsert(monthsToInsert)
            }

            if (toUpdate.length) {
                const monthsToUpdate: PlanningMonth[] = []
                for (const month of toUpdate) {
                    const { items: { toAdd: itemsToAdd, toUpdate: itemsToUpdate }} = month
                    const planningMonth = new PlanningMonth(month.idMonth, month.expectedAmount, month.spentOnDebit, month.spentOnCredit, month.totalIn, month.totalOut, true, month.id)
                    planningMonth.balance += BalanceCalculator.CalculateMonthBalance([...itemsToAdd, ...itemsToUpdate]) 
                    totalBalancePlanning += planningMonth.balance
                    monthsToUpdate.push(planningMonth)
                    if (itemsToUpdate.length) await this.planningMonthItemRepository.bulkUpdate(itemsToUpdate)
                    if (itemsToAdd.length) await this.planningMonthItemRepository.bulkInsert(itemsToAdd)
                }
                await this.planningMonthRepository.bulkUpdate(monthsToUpdate)
            }
            
            const planning = new Planning(year, input.status, input.title, input.expectedAmount, input.startAt, input.endAt)
            planning.balance = totalBalancePlanning
            await this.planningRepository.update(planning)
            await this.planningRepository.commitTransaction()
        } catch (e) {
            await this.planningRepository.rollbackTransaction()
            throw e
        }   
    }
}

type ToAddOrUpdateMonths = {
    toAdd: {
        expectedAmount: number,
        idMonth: number,
        totalIn: number,
        totalOut: number,
        spentOnCredit: number,
        spentOnDebit: number,
        items: {
            toAdd: {
                idType: number,
                value: number,
                operation: "in" | "out",
                date: Date,
                paymentMethod: "debit" | "credit" | null,
                description: string
            }[],
        }
    }[],
    toUpdate: {
        id: number,
        expectedAmount: number,
        idMonth: number,
        totalIn: number,
        totalOut: number,
        spentOnCredit: number,
        spentOnDebit: number,
        items: {
            toAdd: {
                value: number,
                idType: number,
                operation: "in" | "out",
                date: Date,
                paymentMethod: "debit" | "credit" | null,
                description: string
            }[],
            toUpdate: {
                id: number,
                idType: number,
                value: number,
                operation: "in" | "out",
                date: Date,
                paymentMethod: "debit" | "credit" | null,
                description: string
            }[],
        }
    }[]
}
type Input = {
    status: number,
    id: number,
    monthsToRemove: number[],
    itemsToRemove: number[],
    startAt: Date,
    endAt: Date,
    title: string,
    year: number,
    expectedAmount: number,
    months: ToAddOrUpdateMonths
}