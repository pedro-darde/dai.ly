import PlanningMonthItem from "../../domain/entity/PlanningMonthItem";
import PlanningMonthItemRepository from "../../domain/repository/PlanningMonthItemRepository";
import Connection from "../database/Connection";
import {
  ArrangeOfSet,
  getObjectArrayAsString,
  getSetForCteByKeys,
} from "../helpers/DbHelper";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class PlanningMonthItemRepositoryDatabase
  extends BaseRepositoryDatabase
  implements PlanningMonthItemRepository
{
  findByUniqueKey(uniqueKey: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  private mabDBKeysByModelProps: { [key in keyof PlanningMonthItem]: string } =
    {
      date: "date",
      description: "description",
      operation: "operation",
      value: "value",
      paymentMethod: "payment_method",
      idCard: "id_card",
      idType: "id_type",
      idPlanningMonth: "id_month_planning",
      isInvestiment: "is_investiment",
    };
  constructor(readonly connection: Connection) {
    super(connection, "planning_month_item");
  }
  async bulkDelete(ids: number[]): Promise<void> {
    await this.connection.query(
      "DELETE FROM phd.planning_month_item WHERE id = ANY($1)",
      [ids]
    );
  }
  async bulkInsert(items: PlanningMonthItem[]): Promise<void> {
    const keys: (keyof PlanningMonthItem)[] = Object.keys(
      this.mabDBKeysByModelProps
    ).map((key) => key) as (keyof PlanningMonthItem)[];
    const bulkString = getObjectArrayAsString(items, keys);
    const dbKeys = Object.values(this.mabDBKeysByModelProps).map(
      (valueKey) => valueKey
    );
    await this.connection.query(
      `INSERT INTO phd.planning_month_item (${dbKeys.join(
        ","
      )}) VALUES ${bulkString}`,
      []
    );
  }
  async bulkUpdate(items: PlanningMonthItem[]): Promise<void> {
    const keys: (keyof PlanningMonthItem)[] = [
      ...(Object.keys(this.mabDBKeysByModelProps).map(
        (key) => key
      ) as (keyof PlanningMonthItem)[]),
      "id",
    ];
    const setKeys: ArrangeOfSet<PlanningMonthItem>[] = keys.map((key) => ({
      itemKey: key,
      dbKey: this.mabDBKeysByModelProps[key] ?? key,
    }));
    const setCTE = getSetForCteByKeys("cte", setKeys);
    const bulkString = getObjectArrayAsString(items, keys);
    const SQL = `UPDATE phd.planning_month_item as planning_month_item SET ${setCTE} FROM (VALUES ${bulkString}) AS cte(${setKeys
      .map((item) => item.dbKey)
      .join(",")})  WHERE planning_month_item.id = cte.id`;
    await this.connection.query(SQL, []);
  }

  async create(data: PlanningMonthItem): Promise<number> {
    const [{ id }] = await this.connection.query<[{ id: number }]>(
      "INSERT INTO phd.planning_month_item (date, description, operation, value, payment_method, id_card, id_type, id_month_planning) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [
        data.date,
        data.description,
        data.operation,
        data.value,
        data.paymentMethod,
        data.idCard,
        data.idType,
        data.idPlanningMonth,
      ]
    );
    return id;
  }
}
