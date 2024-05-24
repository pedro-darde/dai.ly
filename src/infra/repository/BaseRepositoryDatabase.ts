import BaseRepository, {
  DbKeysToInsery,
} from "../../domain/repository/BaseRepository";
import Connection from "../database/Connection";

export default abstract class BaseRepositoryDatabase implements BaseRepository {
  connection: Connection;
  keys?: DbKeysToInsery;
  table: string;

  primaryKey: string | string[] = []
  protected constructor(connection: Connection, table: string, keys?: DbKeysToInsery ) {
    this.connection = connection;
    this.table = table;
    this.keys = keys;
  }

  async commitTransaction() {
    await this.connection.query("COMMIT;", []);
  }

  async beginTransaction() {
    await this.connection.query("BEGIN;", []);
  }

  async rollbackTransaction() {
    await this.connection.query("ROLLBACK;", []);
  }

  /**
   * Inserts a row on specified table
   * Remember to pass data at the same order of ##{this.dbKeys}
   **/
  async insert<T extends { [key: string]: any }>(data: T): Promise<void> {
    if (this.keys?.length) {
      const sqlParamsNumber = Array.from(
        { length: this.keys.length },
        (_, idx) => `$${idx + 1}`
      ).join(",");
      const sql = `INSERT INTO phd.${this.table} (${this.keys.join(
        ","
      )}) VALUES (${sqlParamsNumber}) `;
      await this.connection.query(sql, Object.values<T>(data));
    }
  }

  async rawUpdate<T extends {[key: string]: any}>(data: T): Promise<void> {
    if (this.keys?.length) {
      let decrease = 0
      const setString = Array.from(
          { length: this.keys.length },
        (_, idx) => {
          let setStr = '';
          if (!this.primaryKey.includes(this.keys?.at(idx)!)) {
            const rangeIndex = (idx + 1) - decrease
            setStr += `${this.keys?.at(idx)} = $${rangeIndex}`
            return setStr
          } else {
            decrease++
          }
        }
      ).filter(Boolean)
      .join(" , ")
      const where = this.buildWhereForUpdate()
      const sql = `UPDATE phd.${this.table} ${"SET ".concat(setString)} ${where}`
      await this.connection.query(sql, Object.values<T>(data).reverse())
    }
  }

  abstract findByUniqueKey(uniqueKey: any, value: any): Promise<any>;

  private buildWhereForUpdate() {
    if (Array.isArray(this.primaryKey) && this.keys)
    {
      let whereStr = ' WHERE '
      const keysLength = this.keys!.filter(key => !this.primaryKey.includes(key)).length
      whereStr += this.primaryKey.map((key, count) => ` ${key} = $${keysLength + (count + 1)}`).join(" AND  ")
      return whereStr
    }
  }
}
