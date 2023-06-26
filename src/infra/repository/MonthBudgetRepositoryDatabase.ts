import MonthBudgetRepository from "../../domain/repository/MonthBudgetRepository";
import Connection from "../database/Connection";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class MonthBudgetRepositoryDatabase
  extends BaseRepositoryDatabase
  implements MonthBudgetRepository
{
  constructor(readonly connection: Connection) {
    super(connection, "month_budget");
    this.keys = ["id_type", "id_planning_month", "amount"];
    this.primaryKey = ['id_planning_month', 'id_type']
  }
  findByUniqueKey(uniqueKey: any, value: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
