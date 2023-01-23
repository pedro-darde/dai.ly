import Month from "../../domain/entity/Month";
import MonthRepository from "../../domain/repository/MonthRepository";
import Connection from "../database/Connection";

export default class MonthRepositoryDatabase implements MonthRepository {

    constructor(readonly connection: Connection) {}

    async list(): Promise<Month[]> {
        const monthData = await this.connection.query<any[]>("SELECT * FROM phd.months", []);
        const months: Month[] = []
        for (const month of monthData) {
            months.push(new Month(month.id, month.month_name, month.month_as_number))
        }
        return months
    }
}