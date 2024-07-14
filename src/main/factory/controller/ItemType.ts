import ItemTypeController from "../../../infra/controller/ItemTypeController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import RequiredArrayFieldsValidation from "../../../validators/RequiredArrayFieldsValidation";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";
import { makeCrudItem } from "../usecases/CrudItem";
import { makeGetItemType } from "../usecases/GetItemType";

export const makeItemTypeController = (
  server: HttpServer,
  connection: Connection
): ItemTypeController => {
  const validationCrud = new RequiredFieldValidation("description");
  const manyCrudValidation = new RequiredArrayFieldsValidation("items", [
    {
      field: "description",
      type: "string",
    },
  ]);
  return new ItemTypeController(
    server,
    makeGetItemType(connection),
    makeCrudItem(connection),
    validationCrud,
    manyCrudValidation
  );
};
