import GetItemType from "../../../application/GetItemType";
import Connection from "../../../infra/database/Connection";
import { makeItemTypeRepository } from "../repository/ItemTypeRepository";

export const makeGetItemType = (connection: Connection): GetItemType => {
    return new GetItemType(makeItemTypeRepository(connection))
}