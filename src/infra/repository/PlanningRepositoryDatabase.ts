import MonthBudget from "../../domain/entity/MonthBudget";
import Planning from "../../domain/entity/Planning";
import PlanningMonth, { TypeSpent } from "../../domain/entity/PlanningMonth";
import PlanningMonthItem from "../../domain/entity/PlanningMonthItem";
import TreeSelect from "../../domain/entity/Treeselect";
import PlanningRepository, {
  ItemsPlanning,
  PlanningDatabase,
} from "../../domain/repository/PlanningRepository";
import Connection from "../database/Connection";
import { getSetByKeysValues } from "../helpers/DbHelper";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class PlanningRepositoryDatabase
  extends BaseRepositoryDatabase
  implements PlanningRepository
{
  findByUniqueKey(uniqueKey: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  constructor(readonly connection: Connection) {
    super(connection, "planning");
  }

  async save(planning: Planning): Promise<void> {
    try {
      await this.beginTransaction();
      const [{ id: idPlanning }] = await this.connection.query<
        [{ id: number }]
      >(
        "INSERT INTO phd.planning (year, status, title, expected_amount, balance, start_at, end_at) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id",
        [
          planning.year,
          planning.status,
          planning.title,
          planning.expectedAmount,
          planning.balance,
          planning.startAt,
          planning.endAt,
        ]
      );
      if (planning.getMonths().length) {
        for (const month of planning.getMonths()) {
          const [{ id: idMonthPlanning }] = await this.connection.query<
            [{ id: number }]
          >(
            "INSERT INTO phd.planning_month (id_month, id_planning, balance, total_in, total_out, spent_on_debit, spent_on_credit, credit_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id",
            [
              month.idMonth,
              idPlanning,
              month.balance,
              month.totalIn,
              month.totalOut,
              month.spentOnDebit,
              month.spentOnCredit,
              month.creditStatus,
            ]
          );
          if (month.getItens().length) {
            for (const monthItem of month.getItens()) {
              await this.connection.query(
                "INSERT INTO phd.planning_month_item (id_month_planning, value, description, id_type , id_card, operation, date, payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [
                  idMonthPlanning,
                  monthItem.value,
                  monthItem.description,
                  monthItem.idType,
                  monthItem.idCard,
                  monthItem.operation,
                  monthItem.date,
                  monthItem.paymentMethod,
                ]
              );
            }
          }
        }
      }
      await this.commitTransaction();
    } catch (e: any) {
      await this.rollbackTransaction();
      throw e;
    }
  }

  async getByYear(year: number): Promise<Planning | void> {
    const SQL = `
        SELECT
    PLANNING.*,
    (
        SELECT JSONB_AGG(T) RES
        FROM (
            SELECT
                PLANNING_MONTH.*,
                JSON_AGG(PLANNING_MONTH_ITEM.* ORDER BY date) AS ITEMS,
                COALESCE(
                    (
                        SELECT JSONB_AGG(DISTINCT mb.*)
                        FROM PHD.month_budget mb
                        WHERE mb.id_planning_month = PLANNING_MONTH.id
                            AND mb.id_type IS NOT NULL
                            AND mb.id_planning_month IS NOT NULL
                    ),
                    '[]'
                ) AS budgets
            FROM
                PHD.PLANNING_MONTH PLANNING_MONTH
                INNER JOIN PHD.PLANNING_MONTH_ITEM PLANNING_MONTH_ITEM ON PLANNING_MONTH_ITEM.ID_MONTH_PLANNING = PLANNING_MONTH.ID
            WHERE
                PLANNING_MONTH.ID_PLANNING = PLANNING.ID
            GROUP BY
                PLANNING_MONTH.ID
            ORDER BY
                PLANNING_MONTH.ID_MONTH
        ) T
    ) AS MONTHS
FROM
    PHD.PLANNING PLANNING
WHERE
    PLANNING.YEAR = $1
GROUP BY
    PLANNING.ID;
    `;
    const data = await this.connection.query<PlanningDatabase[]>(SQL, [year]);
    if (data.length) {
      const [planningDatabase] = data;
      const planning = new Planning(
        planningDatabase.year,
        planningDatabase.status,
        planningDatabase.title,
        parseFloat(planningDatabase.expected_amount),
        planningDatabase.start_at,
        planningDatabase.end_at,
        planningDatabase.id
      );
      if (planningDatabase.months?.length) {
        for (const month of planningDatabase.months) {
          const planningMonth = new PlanningMonth(
            month.id_month,
            parseFloat(month.spent_on_debit),
            parseFloat(month.spent_on_debit),
            parseFloat(month.total_in),
            parseFloat(month.total_out),
            parseFloat(month.credit_status),
            planning.id!,
            month.open,
            month.id
          );
          planningMonth.typesSpent = await this.buildNestedTypedSpents(
            month.items
          );
          if (month.items?.length) {
            for (const item of month.items)
              planningMonth.addItem(
                new PlanningMonthItem(
                  parseFloat(item.value),
                  item.operation,
                  item.date,
                  item.description,
                  item.id_type,
                  item.id_month_planning,
                  item.id_card,
                  item.payment_method,
                  item.id
                )
              );
          }
          if (month.budgets?.length) {
            const monthBudgets = month.budgets.map(
              (item) =>
                new MonthBudget(
                  item.id_type,
                  item.id_planning_month,
                  parseFloat(item.amount)
                )
            );

            planningMonth.withBudgets(monthBudgets);
          }
          planning.addMonth(planningMonth);
        }
      }
      return planning;
    }
  }

  async update(planning: Planning) {
    const mapDBKeys: any = {
      balance: "balance",
      expectedAmount: "expected_amount",
      startAt: "start_at",
      title: "title",
      endAt: "end_at",
    };
    const keys: (keyof Planning)[] = [
      "balance",
      "expectedAmount",
      "startAt",
      "title",
    ];
    const setString = getSetByKeysValues(
      planning,
      keys.map((key) => ({ dbKey: mapDBKeys[key], itemKey: key }))
    );
    await this.connection.query(
      `UPDATE phd.planning SET ${setString} WHERE year = $1`,
      [planning.year]
    );
  }

  async buildNestedTypedSpents(spents: ItemsPlanning[]) {
    const itemTypeData = await this.connection.query<any[]>(
      `SELECT *, description as label from phd.item_type WHERE active = $1`,
      [true]
    );
    for (const itemData of itemTypeData) {
      itemData.spents = spents.filter((item) => item.id_type === itemData.id);
    }
    return TreeSelect.toTreeSelectStyle(itemTypeData, "id");
  }

  async existingYears(): Promise<{ year: number; id: number }[]> {
    return await this.connection.query<{ year: number; id: number }[]>(
      "SELECT id, year FROM phd.planning",
      []
    );
  }
}
