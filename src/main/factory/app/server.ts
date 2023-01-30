import ExpressAdapter from "../../../infra/http/ExpressAdapter";
import HttpServer from "../../../infra/http/HttpServer";

export const makeServer = (): HttpServer => {
    return new ExpressAdapter()
}