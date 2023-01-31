import PlanningMonthItem from "../../domain/entity/PlanningMonthItem";
import PlanningMonthItemRepository from "../../domain/repository/PlanningMonthItemRepository";
import Connection from "../database/Connection";
import { ArrangOfSet, getObjectArrayAsString, getSetForCteByKeys } from "../helpers/DbHelper";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class PlanningMonthItemRepositoryDatabase extends BaseRepositoryDatabase implements PlanningMonthItemRepository {
    constructor (readonly connection: Connection) {
        super(connection)
    }
    async bulkDelete (ids: number[]):Promise<void> {
        await this.connection.query("DELETE FROM phd.planning_month_item WHERE id ANY($1)", [ids]);
    }
    async bulkInsert (items: PlanningMonthItem[]):Promise<void> {
        const keys: (keyof PlanningMonthItem)[] = ["date", "description", "operation", "value", "paymentMethod"]
        const bulkString = getObjectArrayAsString(items, keys)
        await this.connection.query(`INSERT INTO phd.planning_month_item (${keys.join(',')}) VALUES ${bulkString}`, [])
    }
    async bulkUpdate (items: PlanningMonthItem[]):Promise<void> {
        const mapKeysDbName: any = {
            "id": "id",
            "date" : "date",
            "description": "description",
            "operation" : "operation",
            "value" : "value",
            "paymentMethod": "payment_method"
        }
        const keys: (keyof PlanningMonthItem)[] = ["id", "date", "description", "operation", "value", "paymentMethod"]
        const setKeys: ArrangOfSet<PlanningMonthItem>[] = keys.map(key => ({itemKey: key, dbKey: mapKeysDbName[key] }))
        const setCTE = getSetForCteByKeys( 'cte', setKeys)   
        const bulkString = getObjectArrayAsString(items, keys)
        const SQL = `UPDATE phd.planning_month_item as planning_month_item SET ${setCTE} FROM (VALUES ${bulkString}) AS cte(${keys.join(',')})  WHERE planning_month_item.id = cte.id`
        await this.connection.query(SQL, [])
    }
}