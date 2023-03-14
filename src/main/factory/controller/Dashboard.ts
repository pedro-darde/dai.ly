import DashboardController from "../../../infra/controller/DashboardController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import { makeDashboard } from "../usecases/Dashboard";

export const makeDashboardController = (httpServer: HttpServer, connection: Connection) => {
    return new DashboardController(httpServer, makeDashboard(connection))
}