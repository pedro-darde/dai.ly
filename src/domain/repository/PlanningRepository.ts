import Planning from "../entity/Planning";
import BaseRepository from "./BaseRepository";


export type PlanningDatabase = {
    id: number,
    year: number,
    status: number,
    title: string,
    expected_amount: string,
    balance: number,
    start_at: Date,
    end_at: Date,
    months: {
        id: number,
        id_month: number,
        balance: string,
        expected_amount: string,
        spent_on_debit: string,
        spent_on_credit: string,
        total_in: string,
        total_out: string,
        open: boolean,
        items: {
            id: number,
            id_planning_month: number,
            value: string,
            description: string,
            operation: "in" | "out",
            date: Date,
            payment_method: "debit" | "credit"
        }[]
    }[]
}
export default interface PlanningRepository extends BaseRepository {
    save: (planning: Planning) => Promise<void>
    getByYear: (year:number) => Promise<Planning  | void>
    update: (planning: Planning) => Promise<void>
}