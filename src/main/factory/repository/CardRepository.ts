import CardRepository from "../../../domain/repository/CardRepository";
import Connection from "../../../infra/database/Connection";
import CardRepositoryDatabase from "../../../infra/repository/CardRepositoryDatabase";

export const makeCardRepository = (connection: Connection): CardRepository => {
    return new CardRepositoryDatabase(connection)
}