import InstallMentservice from "../../../application/InstallmentService";
import Connection from "../../../infra/database/Connection";
import { makePlanningRepository } from "../repository/Planning";
import { makePlanningMonthRepository } from "../repository/PlanningMonth";
import { makePlanningMonthItemRepository } from "../repository/PlanningMonthItem";

export const makeInstallmentService = (connection: Connection) => {
  return new InstallMentservice(
    makePlanningMonthItemRepository(connection),
    makePlanningMonthRepository(connection)
  );
};
