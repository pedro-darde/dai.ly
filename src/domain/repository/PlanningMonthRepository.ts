import PlanningMonth from "../entity/PlanningMonth"
import BaseRepository from "./BaseRepository"

export default interface PlanningMonthRepository extends BaseRepository {
    bulkDelete: (ids: number[]) => Promise<void>
    bulkUpdate: (months: PlanningMonth[]) => Promise<void>
    bulkInsert: (months: PlanningMonth[]) => Promise<void>
}