import AddCard from "../../application/AddCard";
import ListCard from "../../application/ListCard";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class CardController {
  constructor(
    readonly server: HttpServer,
    readonly createValidation: Validation,
    readonly addCard: AddCard,
    readonly listCard: ListCard
  ) {
    server.on("get", "/card", async function (params, body) {
      try {
        const data = await listCard.execute();
        return ok(data);
      } catch (e: any) {
        console.error(e);
        return serverError(e);
      }
    });
    server.on("post", "/card", async function (params, body) {
      try {
        const notOk = await createValidation.validate(body);
        if (notOk) return badRequest(notOk);
        await addCard.execute(body)
        return ok({ message: "Card created" })
      } catch (e: any) {
        console.error(e);
        return serverError(e);
      }
    });
  }
}
