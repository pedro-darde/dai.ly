import PlanningMonth from "../../domain/entity/PlanningMonth";
import PlanningMonthRepository from "../../domain/repository/PlanningMonthRepository";
import Connection from "../database/Connection";
import { getObjectArrayAsString, getSetForCteByKeys } from "../helpers/DbHelper";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class PlanningMonthRepositoryDatabase extends BaseRepositoryDatabase implements PlanningMonthRepository {
    constructor(readonly connection: Connection) {
        super(connection)
    }
    async bulkDelete(ids: number[]) : Promise<void> {
        await this.connection.query("DELETE FROM phd.planning_month WHERE id = ANY($1)", [ids])
    };
    async bulkUpdate (months: PlanningMonth[]) : Promise<void> {
        const keys: (keyof PlanningMonth)[] = ["idMonth", "balance", "expectedAmount", "spentOnCredit", "totalIn", "totalOut"]
        const setCTE = getSetForCteByKeys('planning_month', 'cte', keys)   
        const bulkString = getObjectArrayAsString(months, keys)
        await this.connection.query(`UPDATE phd.planning_month as planning_month ${setCTE} FROM (VALUES ${bulkString}) AS cte(${keys.join(',')})  WHERE planning_month.id = cte.id`, [])

    };
    async bulkInsert (months: PlanningMonth[]) : Promise<void> {
        const keys: (keyof PlanningMonth)[] = ["idMonth", "balance", "expectedAmount", "spentOnCredit", "totalIn", "totalOut"]
        const bulkString = getObjectArrayAsString(months, keys)
        await this.connection.query(`INSERT INTO phd.planning_month (${keys.join(',')}) VALUES ${bulkString}`, [])
    };
}