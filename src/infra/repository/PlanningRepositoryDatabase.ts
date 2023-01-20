import Planning from "../../domain/entity/Planning";
import PlanningRepository from "../../domain/repository/PlanningRepository";
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
                const [{ id: idMonthPlanning }] = await this.connection.query<[{id: number}]>("INSERT INTO phd.planning_month (id_month, id_planning, balance) VALUES ($1, $2, $3) returning id", [month.idMonth, idPlanning, month.balance])
                if (month.getItens().length) {
                    for (const monthItem of month.getItens()) {
                        await this.connection.query("INSERT INTO phd.planning_month_item (id_month_planning, value, operation, date, payment_method) VALUES ($1, $2, $3, $4, $5)", [idMonthPlanning, monthItem.value, monthItem.operation, monthItem.date, monthItem.paymentMethod])
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