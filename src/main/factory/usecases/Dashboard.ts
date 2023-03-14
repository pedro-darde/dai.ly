import Dashboard from "../../../application/Dashboard";
import Connection from "../../../infra/database/Connection";
import { makeItemTypeRepository } from "../repository/ItemTypeRepository";
import { makeMonthRepository } from "../repository/MonthRepository";

export const makeDashboard = (connection: Connection) => {
    return new Dashboard(makeItemTypeRepository(connection), makeMonthRepository(connection))
}