import EditPlanning from "../../application/EditPlanning";
import GetMonths from "../../application/GetMonths";
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
        readonly getMonths: GetMonths,
        readonly editPlanning: EditPlanning,
        readonly createPlanningValidation: Validation,
        readonly editPlanningValidation: Validation
        ) {
        httpServer.on("post", "/planning", async function(params, body) {
            try {
                const errors = await createPlanningValidation.validate(body)
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

        httpServer.on("patch", "/planning/:year", async function (params, body) {
            try {
                const error = await editPlanningValidation.validate(body)
                if (error) return badRequest(error)
                await editPlanning.execute(params.year, body)

                return ok({ message: "Planning Edited" })
            } catch (e: any) {
                console.log(e)
                return serverError(e)
            }
        })

        httpServer.on("get", "/months", async function (params, body) {
            try {   
                const months = await getMonths.execute()
                return ok(months)
            } catch (e: any) { 
                console.error(e)
                return serverError(e)
            }
        })
    }
}