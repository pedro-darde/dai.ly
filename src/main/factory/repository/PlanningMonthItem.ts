import PlanningMonthItemRepository from "../../../domain/repository/PlanningMonthItemRepository"
import Connection from "../../../infra/database/Connection"
import PlanningMonthItemRepositoryDatabase from "../../../infra/repository/PlanningMonthItemRepositoryDatabase"

export const makePlanningMonthItemRepository = (connection: Connection): PlanningMonthItemRepository => {
    return new PlanningMonthItemRepositoryDatabase(connection)
}