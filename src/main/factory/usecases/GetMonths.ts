import GetMonths from "../../../application/GetMonths";
import Connection from "../../../infra/database/Connection";
import { makeMonthRepository } from "../repository/MonthRepository";

export const makeGetMonths = (connection: Connection): GetMonths => {
    return new GetMonths(makeMonthRepository(connection))
}