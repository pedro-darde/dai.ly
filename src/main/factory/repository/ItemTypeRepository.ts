import ItemTypeRepository from "../../../domain/repository/ItemTypeRepository";
import Connection from "../../../infra/database/Connection";
import ItemTypeRepositoryDatabase from "../../../infra/repository/ItemTypeRepositoryDatabase";

export const makeItemTypeRepository = (connection: Connection):ItemTypeRepository => {
    return new ItemTypeRepositoryDatabase(connection)
}