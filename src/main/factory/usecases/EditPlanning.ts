import EditPlanning from "../../../application/EditPlanning";
import Connection from "../../../infra/database/Connection";
import { makeDateFNSAdapter } from "../adapters/DateFns";
import { makePlanningRepository } from "../repository/Planning";
import { makePlanningMonthRepository } from "../repository/PlanningMonth";
import { makePlanningMonthItemRepository } from "../repository/PlanningMonthItem";

export const makeEditPlanning = (connection: Connection): EditPlanning => {
  return new EditPlanning(
    makePlanningRepository(connection),
    makePlanningMonthRepository(connection),
    makePlanningMonthItemRepository(connection),
    makeDateFNSAdapter()
  );
};
