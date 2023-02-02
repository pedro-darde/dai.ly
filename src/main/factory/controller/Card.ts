import CardController from "../../../infra/controller/CardController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import { makeAddCard } from "../usecases/AddCard";
import { makeListCard } from "../usecases/ListCard";
import { makeAddCardValidation } from "../validation/AddCard";

export const makeCardController = (server: HttpServer, connection: Connection): CardController => {
    return new CardController(server, makeAddCardValidation(), makeAddCard(connection), makeListCard(connection))
}