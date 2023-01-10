import TaskService from "../../application/TaskService";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";
import ValidateTask from "../../application/ValidateTask";

export default class TaskController {
  constructor(
    readonly server: HttpServer,
    readonly taskService: TaskService,
    readonly validateTask: ValidateTask,
    createEditValidation: Validation
  ) {
    server.on("post", "/task", async function (params, body) {
      try {
        const error = createEditValidation.validate(body);
        if (error) return badRequest(error);
        await taskService.create(body);
        return ok({ message: "Task created" });
      } catch (err: any) {
        console.error(err);
        return serverError(err);
      }
    });

    server.on("get", "/activeTasks", async function (params, body) {
      try {
        const tasks = await taskService.getActives();
        return ok(tasks);
      } catch (e: any) {
        console.error(e)
        return serverError(e);
      }
    });

    server.on("get", "/task", async function (params, body) {
      try {
          const tasks = await taskService.getAll();
          return ok(tasks)
      } catch (e: any) {
        return serverError(e)
      }
    })

    server.on("patch", "/task/:idTask", async function (params, body) {
      try {
        const error = createEditValidation.validate(body)
        if(error) return badRequest(error)
        await taskService.update(params.idTask, body)
        return ok({ message: "Task updated"})
      } catch (e: any) {
        console.error(e)
        return serverError(e)
      }
    })

    server.on("delete", "/task/:idTask", async function (params, body) {
      try {
        await taskService.remove(params.idTask, body)
        return ok({ message: "Task deleted"})
      } catch (e: any) {
        console.error(e)
        return serverError(e)
      }
    })

    server.on("put", "/validateTask/:idTask", async function (params, body) {
      try {
        await validateTask.execute(params.idTask, body)
        return ok({ message: "Task validated."})
      } catch (e: any) {
        return serverError(e)
      }
    })

    server.on("get", "/validatedAndRejected", async function (params, body) {
      try {
        const tasks = await taskService.getValidatedAndRejected()
        return ok(tasks)
      } catch (e: any) {
        return serverError(e)
      }
    })

  }
}
