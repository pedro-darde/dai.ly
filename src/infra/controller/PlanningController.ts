import GetPlanning from "../../application/GetPlanning";
import StartPlanning from "../../application/StartPlanning";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class PlanningController {
    constructor(
        readonly httpServer: HttpServer,
        readonly startPlanning: StartPlanning,
        readonly getPlanning: GetPlanning,
        readonly createEditPlanningValidation: Validation
        ) {
        httpServer.on("post", "/planning", async function(params, body) {
            try {
                const errors = createEditPlanningValidation.validate(body)
                if (errors) return badRequest(errors)
                await startPlanning.execute(body)
                return ok({ message: "Planning created" })
            } catch (e: any) {
                console.log(e)
                return serverError(e)
            }
        })

        httpServer.on("get", "/planning/:year", async function (params, body) {
            try {
                const planning = await getPlanning.execute(params.year)
                return ok(planning)
            } catch (e: any) {
                console.log(e)
                return serverError(e)
            }
        })
    }
}