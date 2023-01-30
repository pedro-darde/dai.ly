import ItemType from "../../domain/entity/ItemType";
import ItemTypeRepository from "../../domain/repository/ItemTypeRepository";
import Connection from "../database/Connection";

export default class ItemTypeRepositoryDatabase implements ItemTypeRepository {
  constructor(readonly connection: Connection) {}

  async list(): Promise<ItemType[]> {
    const data = await this.connection.query<ItemType[]>(
      "SELECT * FROM phd.item_type WHERE active is true",
      []
    );
    return data;
  }

  async create(data: Omit<ItemType, "id">): Promise<void> {
    await this.connection.query(
      "INSERT INTO phd.item_type (description, active) VALUES ($1, $2)",
      [data.description, data.active]
    );
  }
}
