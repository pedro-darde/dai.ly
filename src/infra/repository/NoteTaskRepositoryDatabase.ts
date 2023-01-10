import NoteTaskRepository from "../../domain/repository/NoteTaskRepository";
import Connection from "../database/Connection";
import NoteTask from "../../domain/entity/NoteTask";

export default class NoteTaskRepositoryDatabase implements NoteTaskRepository {
    constructor(readonly connection: Connection) {
    }

    async save(taskNote: NoteTask): Promise<void> {
        await this.connection.query("INSERT INTO phd.task_note (id_task, id_note) VALUES ($1,$2)", [
            taskNote.idTask,
            taskNote.idNote
        ])
    }

    async removeByNoteAndTasks(noteId: number, tasks: number[]): Promise<void> {
        await this.connection.query("DELETE FROM phd.task_note WHERE id_note = $1 and id_task = ANY($2)", [noteId, tasks])
    }
}