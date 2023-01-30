import NoteTaskRepository from "../../../domain/repository/NoteTaskRepository";
import Connection from "../../../infra/database/Connection";
import NoteTaskRepositoryDatabase from "../../../infra/repository/NoteTaskRepositoryDatabase";

export const makeNoteTaskRepository = (connection: Connection): NoteTaskRepository => {
    return new NoteTaskRepositoryDatabase(connection)
}