import Note from "../../domain/entity/Note";
import NoteRepository, {
  NoteWithId,
} from "../../domain/repository/NoteRepository";
import Connection from "../database/Connection";

export default class NoteRepositoryDatabase implements NoteRepository {
  constructor(readonly connection: Connection) {}

  async save(note: Note): Promise<void> {
    await this.connection.query(
      "INSERT INTO phd.notes (description,fixed) VALUES ($1, $2)",
      [note.description, note.fixed]
    );
  }

  async getNote(idNote: number): Promise<NoteWithId> {
    const [noteData] = await this.connection.query<[NoteWithId]>(
      "SELECT * FROM phd.notes WHERE id = $1",
      [idNote]
    );
    return noteData;
  }

  async getAll(): Promise<NoteWithId[]> {
    return await this.connection.query<NoteWithId[]>(
      "SELECT * FROM phd.notes",
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
      "UPDATE phd.notes SET description = $1 WHERE id = $2",
      [note.description, idNote]
    );
  }

  async clear(): Promise<void> {
    await this.connection.query("TRUNCATE TABLE phd.notes", []);
  }
}
