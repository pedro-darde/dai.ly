import Note from "../../domain/Note";
import Connection from "./Connection";
import pgp from "pg-promise";
export default class PgPromiseAdapter implements Connection {
  pgp;

  constructor() {
    this.pgp = pgp()("postgres://postgres:postgres@localhost:5432/daily");
  }

  async query<T>(query: string, params: any[]): Promise<T> {
    return await this.pgp.query<T>(query, params);
  }
  async close(): Promise<void> {
    await this.pgp.$pool.end();
  }
}
