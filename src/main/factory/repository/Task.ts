import TaskRepository from "../../../domain/repository/TaskRepository";
import Connection from "../../../infra/database/Connection";
import TaskRepositoryDatabase from "../../../infra/repository/TaskRepositoryDatabase";
import { makeDBConnection } from "../database/Connection";

export const makeTaskRepository = (connection: Connection): TaskRepository => {
    return new TaskRepositoryDatabase(connection)
}