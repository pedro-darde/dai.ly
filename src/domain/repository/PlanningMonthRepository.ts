import PlanningMonth from "../entity/PlanningMonth"
import BaseRepository from "./BaseRepository"

export default interface PlanningMonthRepository extends BaseRepository {
    create: (planningMonth: PlanningMonth) => Promise<number>
    edit: (id: number, data: PlanningMonth) => Promise<void>
    bulkDelete: (ids: number[]) => Promise<void>
}