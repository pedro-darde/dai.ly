import Dashboard from "../../../application/Dashboard";
import Connection from "../../../infra/database/Connection";
import { makeCardRepository } from "../repository/CardRepository";
import { makeItemTypeRepository } from "../repository/ItemTypeRepository";
import { makeMonthRepository } from "../repository/MonthRepository";

export const makeDashboard = (connection: Connection) => {
  return new Dashboard(
    makeItemTypeRepository(connection),
    makeMonthRepository(connection),
    makeCardRepository(connection)
  );
};
