import PlanningMonth from "../../domain/entity/PlanningMonth";
import PlanningMonthRepository from "../../domain/repository/PlanningMonthRepository";
import Connection from "../database/Connection";
import { ArrangeOfSet, getObjectArrayAsString, getSetByKeysValues, getSetForCteByKeys, getSetString, getValuesString } from "../helpers/DbHelper";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class PlanningMonthRepositoryDatabase extends BaseRepositoryDatabase implements PlanningMonthRepository {

    private mabDBKeysByModelProps: {[key: string]: string} = {
        "balance": "balance",
        "expectedAmount": "expected_amount",
        "idMonth": "id_month",
        "spentOnCredit": "spent_on_credit",
        "spentOnDebit" : "spent_on_debit",
        "totalIn": "total_in",
        "totalOut": "total_out",
        "idPlanning": "id_planning"
    }

    constructor(readonly connection: Connection) {
        super(connection)
    }
    async bulkDelete(ids: number[]) : Promise<void> {
        await this.connection.query("DELETE FROM phd.planning_month WHERE id = ANY($1)", [ids])
    };
    async edit (id: number, month: PlanningMonth) : Promise<void> 
    {    
        const keys: ArrangeOfSet<PlanningMonth>[] = Object.keys(this.mabDBKeysByModelProps).map(key => ({ dbKey: this.mabDBKeysByModelProps[key], itemKey: key})) as ArrangeOfSet<PlanningMonth>[]
        const setString = getSetString<PlanningMonth>(month, keys)
        await this.connection.query(`UPDATE phd.planning_month SET ${setString}  WHERE planning_month.id = $1`, [id])

    };
    async create (month: PlanningMonth) : Promise<number> {
        const keys: any = Object.keys(this.mabDBKeysByModelProps).map(key => ({ dbKey: this.mabDBKeysByModelProps[key], itemKey: key})) as ArrangeOfSet<PlanningMonth>[]
        const VALUES = getValuesString(month, keys)
        const [{ id }] = await this.connection.query<[{id: number}]>(`INSERT INTO phd.planning_month (${keys.map(({ dbKey }: any) => dbKey)}) VALUES ${VALUES} RETURNING id`, [])
        return id
    };
    async findByUniqueKey (uniqueKey: any): Promise<any> {
        
    }
}