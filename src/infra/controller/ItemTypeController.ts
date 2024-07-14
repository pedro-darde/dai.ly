import CrudItemType from "../../application/CrudItemType";
import GetItemType from "../../application/GetItemType";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class ItemTypeController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getItems: GetItemType,
    readonly crudItem: CrudItemType,
    readonly crudValidation: Validation,
    readonly manyCrudValidation: Validation
  ) {
    httpServer.on("get", "/itemType", async function (params, body) {
      try {
        const items = await getItems.execute();
        return ok(items);
      } catch (e: any) {
        console.error(e);
        return serverError(e);
      }
    });
    httpServer.on("post", "/itemType", async function (params, body) {
      try {
        const error = await crudValidation.validate(body);
        if (error) return badRequest(error);
        await crudItem.create(body);
        return ok({ message: "Item created" });
      } catch (e: any) {
        console.error(e);
        return serverError(e);
      }
    });
    httpServer.on("post", "/itemType/:id", async function (params, body) {
      try {
        const error = await crudValidation.validate(body);
        if (error) return badRequest(error);
        await crudItem.update(params.id, body);
        return ok({ message: "Item updated" });
      } catch (e: any) {
        console.error(e);
        return serverError(e);
      }
    });

    httpServer.on("post", "/itemType/updateMany", async function (_, body) {
      try {
        const error = await manyCrudValidation.validate(body);
        if (error) return badRequest(error);
        await crudItem.updateMany(body.items);
        return ok({ message: "Items updated" });
      } catch (e: any) {
        console.error(e);
        return serverError(e);
      }
    });
  }
}
