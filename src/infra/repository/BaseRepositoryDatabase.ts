import BaseRepository from "../../domain/repository/BaseRepository"
import Connection from "../database/Connection"

export default abstract class BaseRepositoryDatabase implements BaseRepository {
    connection: Connection
    constructor (connection: Connection) {
        this.connection = connection
    }

    async commitTransaction() {
        await this.connection.query("COMMIT;", [])
    }
    
    async beginTransaction() {
        await this.connection.query("BEGIN;", [])
    }

    async rollbackTransaction() {
        await this.connection.query("ROLLBACK;", [])
    }
}