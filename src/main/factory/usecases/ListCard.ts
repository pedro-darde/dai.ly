import ListCard from "../../../application/ListCard";
import Connection from "../../../infra/database/Connection";
import { makeCardRepository } from "../repository/CardRepository";

export const makeListCard = (connection: Connection): ListCard => {
    return new ListCard(makeCardRepository(connection))
}