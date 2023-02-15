import Card from "../../domain/entity/Card";
import CardRepository, {
  CardOnDB,
  CardWithTransaction,
} from "../../domain/repository/CardRepository";
import Connection from "../database/Connection";
import BaseRepositoryDatabase from "./BaseRepositoryDatabase";

export default class CardRepositoryDatabase
  extends BaseRepositoryDatabase
  implements CardRepository
{
  constructor(readonly connection: Connection) {
    super(connection);
  }

  async create(card: Card): Promise<void> {
    await this.connection.query(
      "INSERT INTO phd.card (name, owner_name, number, flag, type, validateDate, cvv) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        card.cardName,
        card.ownerName,
        card.number,
        card.flag,
        card.type,
        card.validateDate,
        card.cvv,
      ]
    );
  }

  async list(): Promise<CardWithTransaction[]> {
    const data = await this.connection.query<CardOnDB[]>(
      "SELECT card.*, " +
      "COALESCE(JSONB_AGG((SELECT ROW_TO_JSON(vd) " +
                          " FROM (SELECT item.value, item.description, item.operation) AS vd)) " +
               " FILTER (WHERE item.value IS NOT NULL), '[]') AS transactions " +
" FROM phd.card card " +
        "LEFT JOIN phd.planning_month_item item ON item.id_card = card.id " +
"GROUP BY card.id",[]);
    return data.map((item) => ({
      ...new Card(
        item.name,
        item.owner_name,
        item.number,
        item.flag,
        item.type,
        item.validatedate,
        item.cvv,
        item.id
      ),
      transactions: item.transactions,
    }));
  }

  async findByUniqueKey(keyValue: any, pkValue: any): Promise<any> {
    const data = await this.connection.query<[{ id?: number }]>(
      `SELECT id FROM phd.card WHERE EXISTS(select ${keyValue} from phd.card WHERE ${keyValue} = $1)`,
      [pkValue]
    );

    return data;
  }
}
