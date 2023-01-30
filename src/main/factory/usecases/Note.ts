import NoteService from "../../../application/NoteService";
import Connection from "../../../infra/database/Connection";
import { makeNoteRepository } from "../repository/Note";

export const makeNoteService = (connection: Connection): NoteService => {
    return new NoteService(makeNoteRepository(connection))
}