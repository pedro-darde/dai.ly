import PlanningMonthItem from "../entity/PlanningMonthItem"
import BaseRepository from "./BaseRepository"

export default interface PlanningMonthItemRepository extends BaseRepository {
    bulkDelete: (ids: number[]) => Promise<void>
    bulkInsert: (items: PlanningMonthItem[]) => Promise<void>
    bulkUpdate: (items: PlanningMonthItem[]) => Promise<void>
    create: (item: PlanningMonthItem) => Promise<number>
}

