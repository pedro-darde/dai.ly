import MonthRepository from "../../../domain/repository/MonthRepository";
import Connection from "../../../infra/database/Connection";
import MonthRepositoryDatabase from "../../../infra/repository/MonthRepositoryDatabase";

export const makeMonthRepository = (connection: Connection): MonthRepository => {
    return new MonthRepositoryDatabase(connection)
}