import TaskService from "../../../application/TaskService";
import Connection from "../../../infra/database/Connection";
import { makeTaskRepository } from "../repository/Task";

export const makeTaskService = (connection: Connection): TaskService => {
    return new TaskService(makeTaskRepository(connection))
}