import Dashboard from "../../application/Dashboard"
import { ok, serverError } from "../helpers/HttpHelper"
import HttpServer from "../http/HttpServer"

export default class DashboardController {
    constructor(readonly httpServer: HttpServer, readonly dashboard: Dashboard) {

        httpServer.on("get", "/dashboard/:year", async function (params, body) {
            try {
                const items = await dashboard.execute(params.year)
                console.log(items)
                return ok(items)
            } catch (e: any) {
                return serverError(e)
            }
        })
    }
}