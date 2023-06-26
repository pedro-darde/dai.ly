import GoalsService from "../../application/GoalsService";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class GoalsController {
  constructor(
    readonly httpServer: HttpServer,
    validation: Validation,
    goalsService: GoalsService
  ) {
    httpServer.on("post", "/goals", async (params, body) => {
      try {
        const err = await validation.validate(body);
        if (err) {
          return badRequest(err);
        }
        await goalsService.execute(body);
        return ok({ message: "Created  goals." });
      } catch (e: any) {
        console.log(e);
        return serverError(e);
      }
    });
  }
}
