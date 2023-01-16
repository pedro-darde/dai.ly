import Note from "../../domain/entity/Note";
import NoteRepository from "../../domain/repository/NoteRepository";
import Connection from "../database/Connection";
import DateHandler from "../date/DateHandler";

export default class NoteRepositoryDatabase implements NoteRepository {
    constructor(
        readonly connection: Connection,
        readonly dateHandler: DateHandler
    ) {
    }

    async save(note: Note, returnId: boolean): Promise<void | number> {
        const [{id}] = await this.connection.query<[{ id: number }]>(
            "INSERT INTO phd.notes (description,fixed) VALUES ($1, $2) RETURNING id",
            [note.description, note.fixed]
        );
        if (returnId) return id
    }

    async getNote(idNote: number): Promise<Note> {
        const [noteData] = await this.connection.query<[Note]>(
            "SELECT * FROM phd.notes WHERE id = $1",
            [idNote]
        );
        return noteData;
    }

    async getAll(): Promise<Note[]> {
        return await this.connection.query<Note[]>(
            "SELECT note.*, (SELECT array_agg(id_task) FROM phd.task_note tn WHERE tn.id_note = note.id) as tasks FROM phd.notes note ORDER BY note.fixed, note.created_at, note.id",
            []
        );
    }

    async changeFix(idNote: number, fixed: boolean): Promise<void> {
        await this.connection.query(
            "UPDATE phd.notes SET fixed = $1 WHERE id = $2",
            [fixed, idNote]
        );
    }

    async deleteNote(idNote: number): Promise<void> {
        await this.connection.query("DELETE FROM phd.notes WHERE id = $1", [
            idNote,
        ]);
    }

    async updateNote(note: Note, idNote: number): Promise<void> {
        await this.connection.query(
            "UPDATE phd.notes SET description = $1, fixed = $2 WHERE id = $3",
            [note.description, note.fixed, idNote]
        );
    }

    async latestNotes(): Promise<Note[]> {
        const sevenDaysAgo = this.dateHandler.remove(new Date(), 1, "weeks");
        return await this.connection.query<Note[]>(
            "SELECT note.*, (SELECT array_agg(id_task) FROM phd.task_note tn WHERE tn.id_note = note.id) as tasks FROM phd.notes note WHERE date(created_at) >= date($1)  group by note.id ORDER BY fixed, created_at, id",
            [sevenDaysAgo]
        );
    }

    async clear(): Promise<void> {
        await this.connection.query("TRUNCATE TABLE phd.notes", []);
    }
}
