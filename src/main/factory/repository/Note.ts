import NoteRepository from "../../../domain/repository/NoteRepository";
import Connection from "../../../infra/database/Connection";
import NoteRepositoryDatabase from "../../../infra/repository/NoteRepositoryDatabase";
import { makeDateFNSAdapter } from "../adapters/DateFns";

export const makeNoteRepository = (connection: Connection): NoteRepository => {
    return new NoteRepositoryDatabase(connection, makeDateFNSAdapter())
}