import GetPlanning from "../../../application/GetPlanning";
import Connection from "../../../infra/database/Connection";
import { makePlanningRepository } from "../repository/Planning";

export const makeGetPlanning = (connection: Connection): GetPlanning => {
    return new GetPlanning(makePlanningRepository(connection))
}