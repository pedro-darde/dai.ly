import Connection from "../../../infra/database/Connection";
import MonthBudgetRepositoryDatabase from "../../../infra/repository/MonthBudgetRepositoryDatabase";

export const makeMonthBudgetRepository = (connection: Connection) => {

  return new MonthBudgetRepositoryDatabase(connection);
};
