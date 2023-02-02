import AddCard from "../../../application/AddCard";
import Connection from "../../../infra/database/Connection";
import { makeCardRepository } from "../repository/CardRepository";

export const makeAddCard  = (connection: Connection): AddCard => {
    return new AddCard(makeCardRepository(connection))
}