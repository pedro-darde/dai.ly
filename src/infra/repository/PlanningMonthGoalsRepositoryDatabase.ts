import PlanningMonthGoals from "../../domain/entity/PlanningMonthGoals";
import PlanningMonthGoalsRepository from "../../domain/repository/PlanningMonthGoalsRepository";
import Connection from "../database/Connection";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class PlanningMonthGoalsRepositoryDatabase
  extends BaseRepositoryDatabase
  implements PlanningMonthGoalsRepository
{
  constructor(readonly connection: Connection) {
    super(connection, "planning_month_goals");
    this.keys = ["id_planning_month", "money_to_save", "credit_limit"];
  }

  findByUniqueKey(uniqueKey: any, value: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async update(id: number, data: PlanningMonthGoals): Promise<void> {
    await this.connection.query(
      "UPDATE phd.planning_month_goals SET credit_limit = $1, money_to_save = $2 WHERE id = $3",
      [data.creditLimit, data.moneyToSave, id]
    );
  }
}
