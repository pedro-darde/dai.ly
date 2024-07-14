import GoalsService from "../../../application/GoalsService";
import Connection from "../../../infra/database/Connection";
import { makeMonthBudgetRepository } from "../repository/MonthBudgetRepository";
import { makePlanningMonthRepository } from "../repository/PlanningMonth";

export const makeGoalsSerivce = (connection: Connection) => {
  return new GoalsService(
    makeMonthBudgetRepository(connection),
    makePlanningMonthRepository(connection)
  );
};
