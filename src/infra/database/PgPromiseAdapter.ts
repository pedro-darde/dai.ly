import Note from "../../domain/entity/Note";
import Connection from "./Connection";
import pgp from "pg-promise";
export default class PgPromiseAdapter implements Connection {
  pgp

  constructor() {
    console.log("infos de conexao ao banco", {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    })
    this.pgp = pgp()(
      `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
  }

  async query<T>(query: string, params: any[]): Promise<T> {
    return await this.pgp.query<T>(query, params);
  }
  async close(): Promise<void> {
    await this.pgp.$pool.end();
  }
}
