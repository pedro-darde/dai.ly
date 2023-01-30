import PlanningMonthRepository from "../../../domain/repository/PlanningMonthRepository";
import Connection from "../../../infra/database/Connection";
import PlanningMonthRepositoryDatabase from "../../../infra/repository/PlanningMonthRepositoryDatabase";

export const makePlanningMonthRepository = (connection: Connection): PlanningMonthRepository => {
    return new PlanningMonthRepositoryDatabase(connection)
}