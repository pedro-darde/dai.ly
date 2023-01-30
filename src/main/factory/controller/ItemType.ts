import ItemTypeController from "../../../infra/controller/ItemTypeController"
import Connection from "../../../infra/database/Connection"
import HttpServer from "../../../infra/http/HttpServer"
import { makeGetItemType } from "../usecases/GetItemType"

export const makeItemTypeController = (server: HttpServer, connection: Connection): ItemTypeController => {
    return new ItemTypeController(server, makeGetItemType(connection))
}