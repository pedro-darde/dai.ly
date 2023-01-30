import NoteTaskService from "../../../application/NoteTaskService";
import Connection from "../../../infra/database/Connection";
import { makeNoteTaskRepository } from "../repository/NoteTask";

export const makeNoteTaskService = (connection: Connection): NoteTaskService => {
    return new NoteTaskService(makeNoteTaskRepository(connection))
}