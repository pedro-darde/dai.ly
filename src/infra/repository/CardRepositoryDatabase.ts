import Card from "../../domain/entity/Card";
import CardRepository, {
  CardOnDB,
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

  async list(): Promise<Card[]> {
    const data = await this.connection.query<CardOnDB[]>(
      "SELECT * FROM phd.card",
      []
    );
    console.log(data);
    return data.map(
      (item) =>
        new Card(
          item.name,
          item.owner_name,
          item.number,
          item.flag,
          item.type,
          item.validatedate,
          item.cvv,
          item.id
        )
    );
  }

  async findByUniqueKey(keyValue: any, pkValue: any): Promise<any> {
    const data = await this.connection.query<[{ id?: number }]>(
      `SELECT id FROM phd.card WHERE EXISTS(select ${keyValue} from phd.card WHERE ${keyValue} = $1)`,
      [pkValue]
    );

    return data;
  }
}
