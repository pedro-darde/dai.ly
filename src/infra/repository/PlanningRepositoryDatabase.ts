import { pl } from "date-fns/locale";
import Planning from "../../domain/entity/Planning";
import PlanningMonth from "../../domain/entity/PlanningMonth";
import PlanningRepository, {  PlanningDatabase } from "../../domain/repository/PlanningRepository";
import Connection from "../database/Connection";

export default class PlanningRepositoryDatabase implements PlanningRepository {
    constructor(readonly connection: Connection) {}

    async save(planning: Planning): Promise<void> {
        try {
        await this.beginTransaction()
        const [{id: idPlanning}] = await this.connection.query<[{id: number}]>("INSERT INTO phd.planning (year, status, title, expected_amount, balance, start_at, end_at) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id", 
            [
                planning.year,
                planning.status,
                planning.title,
                planning.expectedAmount,
                planning.balance,
                planning.startAt,
                planning.endAt
            ])
        if (planning.getMonths().length) {
            for (const month of planning.getMonths()) {
                const [{ id: idMonthPlanning }] = await this.connection.query<[{id: number}]>("INSERT INTO phd.planning_month (id_month, id_planning, balance, expected_amount, total_in, total_out, spent_on_debit, spent_on_credit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id", [month.idMonth, idPlanning,  month.balance, month.expectedAmount, month.totalIn, month.totalOut, month.spentOnDebit, month.spentOnCredit])
                if (month.getItens().length) {
                    for (const monthItem of month.getItens()) {
                        await this.connection.query("INSERT INTO phd.planning_month_item (id_month_planning, value, description, operation, date, payment_method) VALUES ($1, $2, $3, $4, $5, $6)", [idMonthPlanning, monthItem.value, monthItem.description, monthItem.operation, monthItem.date, monthItem.paymentMethod])
                    }
                }
            }
        }
        await this.commitTransaction()
    } catch (e: any) {
        await this.rollbackTransaction()
        throw e
    }
    }

    async getByYear(year: number): Promise<Planning  | void > {
        const data = await this.connection.query<PlanningDatabase[]>(
        "SELECT PLANNING.*," +
            " (SELECT JSONB_AGG(T) RES"
        +    " FROM (SELECT PLANNING_MONTH.*, JSON_AGG(PLANNING_MONTH_ITEM.*) AS ITEMS" +
                    " FROM PHD.PLANNING_MONTH PLANNING_MONTH" +
                        " INNER JOIN PHD.PLANNING_MONTH_ITEM PLANNING_MONTH_ITEM ON PLANNING_MONTH_ITEM.ID_MONTH_PLANNING = PLANNING_MONTH.ID" + 
                            " WHERE PLANNING_MONTH.ID_PLANNING = PLANNING.ID" +
                            " GROUP BY PLANNING_MONTH.ID) T) AS MONTHS" + 
            " FROM PHD.PLANNING PLANNING WHERE PLANNING.YEAR = $1 GROUP BY PLANNING.ID;", [year])
        if (data.length) {
            const [planningDatabase] = data
            const planning = new Planning(planningDatabase.year, planningDatabase.status, planningDatabase.title, planningDatabase.expected_amount, planningDatabase.start_at, planningDatabase.end_at)
            
            if (planningDatabase.months?.length) {
                for (const month of planningDatabase.months) {
                    const planningMonth = new PlanningMonth(planningDatabase.id, month.expected_amount,month.spent_on_debit, month.spent_on_debit, month.total_in, month.total_out)
                    if (month.items?.length) {
                        for (const item of month.items)
                        /** @ts-ignore */
                        planningMonth.addItem(item.value, item.operation.trim(), item.date, item.description, item.payment_method)
                    }
                    planning.addMonth(planningMonth)
                }
            }
            return planning
        } 
    }

    async commitTransaction() {
        await this.connection.query("COMMIT;", [])
    }
    
    async beginTransaction() {
        await this.connection.query("BEGIN;", [])
    }

    async rollbackTransaction() {
        await this.connection.query("ROLLBACK;", [])
    }
      
}