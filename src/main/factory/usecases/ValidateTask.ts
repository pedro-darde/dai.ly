import ValidateTask from "../../../application/ValidateTask";
import Connection from "../../../infra/database/Connection";
import { makeDateFNSAdapter } from "../adapters/DateFns";
import { makeTaskRepository } from "../repository/Task";

export const makeValidateTask = (connection: Connection): ValidateTask => {
    return new ValidateTask(makeTaskRepository(connection), makeDateFNSAdapter());
}