import RemovePlanningItem from "../../../application/RemovePlanningItem";
import Connection from "../../../infra/database/Connection";
import { makePlanningMonthItemRepository } from "../repository/PlanningMonthItem";

export const makeRemoveItem = (connection: Connection): RemovePlanningItem => {
    return new RemovePlanningItem(makePlanningMonthItemRepository(connection))
}