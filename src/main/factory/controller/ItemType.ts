import ItemTypeController from "../../../infra/controller/ItemTypeController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";
import { makeCrudItem } from "../usecases/CrudItem";
import { makeGetItemType } from "../usecases/GetItemType";

export const makeItemTypeController = (
  server: HttpServer,
  connection: Connection
): ItemTypeController => {
  const validationCrud = new RequiredFieldValidation("description");
  return new ItemTypeController(
    server,
    makeGetItemType(connection),
    makeCrudItem(connection),
    validationCrud
  );
};
