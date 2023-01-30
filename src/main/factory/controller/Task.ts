import TaskController from "../../../infra/controller/TaskController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";
import { makeTaskService } from "../usecases/Task";
import { makeValidateTask } from "../usecases/ValidateTask";

export const makeTaskController = (server: HttpServer, connection: Connection): TaskController => {
    const createTaskValidation = new ValidationComposite("about,title,status".split(",").map(field => new RequiredFieldValidation(field)));
    return new TaskController(server, makeTaskService(connection), makeValidateTask(connection), createTaskValidation)
}