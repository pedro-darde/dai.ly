import Planning from "../entity/Planning";


export type PlanningDatabase = {
    id: number,
    year: number,
    status: number,
    title: string,
    expected_amount: number,
    balance: number,
    start_at: Date,
    end_at: Date,
    months: {
        id: number,
        id_month: number,
        balance: number,
        expected_amount: number,
        spent_on_debit: number,
        spent_on_credit: number,
        total_in: number,
        total_out: number
        items: {
            id: number,
            id_planning_month: number,
            value: number,
            description: string,
            operation: "in" | "out",
            date: Date,
            payment_method: "debit" | "credit"
        }[]
    }[]
}
export default interface PlanningRepository {
    save: (planning: Planning) => Promise<void>
    beginTransaction: () => Promise<void>
    commitTransaction: () => Promise<void>
    rollbackTransaction: () => Promise<void>
    getByYear: (year:number) => Promise<Planning  | void>
}