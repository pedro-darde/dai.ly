import TaskService from "../../application/TaskService";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class TaskController {
  constructor(
    readonly server: HttpServer,
    readonly taskService: TaskService,
    createValidation: Validation
  ) {
    server.on("post", "/task", async function (params, body) {
      try {
        const error = createValidation.validate(body);
        if (error) return badRequest(error);
        await taskService.create(body);
        return ok({ message: "Task created" });
      } catch (err: any) {
        console.error(err);
        return serverError(err);
      }
    });

    server.on("get", "/task", async function (params, body) {
      try {
        const tasks = await taskService.getTasks();
        return ok(tasks);
      } catch (e: any) {
        return serverError(e);
      }
    });
  }
}
