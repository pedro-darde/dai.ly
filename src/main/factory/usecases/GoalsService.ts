import GoalsService from "../../../application/GoalsService";
import Connection from "../../../infra/database/Connection";
import { makeMonthBudgetRepository } from "../repository/MonthBudgetRepository";

export const makeGoalsSerivce = (connection: Connection) => {
  return new GoalsService(
    makeMonthBudgetRepository(connection)
  );
};
