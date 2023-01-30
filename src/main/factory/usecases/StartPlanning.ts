import StartPlanning from "../../../application/StartPlanning";
import Connection from "../../../infra/database/Connection";
import { makePlanningRepository } from "../repository/Planning";

export const makeStartPlanning = (connection: Connection): StartPlanning => {
    return new StartPlanning(makePlanningRepository(connection))
}