import GetItemType from "../../application/GetItemType";
import { ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class ItemTypeController {
    constructor(readonly httpServer: HttpServer, readonly getItems: GetItemType) {

        httpServer.on("get", "/itemType", async function (params, body) {
            try {
                const items = await getItems.execute()
                return ok(items)
            } catch (e: any) {
                return serverError(e)
            }
        })
    }
}