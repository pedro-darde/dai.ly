import CrudItemType from "../../../application/CrudItemType";
import Connection from "../../../infra/database/Connection";
import { makeItemTypeRepository } from "../repository/ItemTypeRepository";

export const makeCrudItem = (connection: Connection) =>
  new CrudItemType(makeItemTypeRepository(connection));
