import PlanningRepository from "../../../domain/repository/PlanningRepository";
import Connection from "../../../infra/database/Connection";
import PlanningRepositoryDatabase from "../../../infra/repository/PlanningRepositoryDatabase";

export const makePlanningRepository = (connection: Connection): PlanningRepository => {
    return new PlanningRepositoryDatabase(connection)
}