import Note from "../../domain/entity/Note";
import NoteRepository, {
  NoteWithId,
} from "../../domain/repository/NoteRepository";
import Connection from "../database/Connection";

export default class NoteRepositoryDatabase implements NoteRepository {
  constructor(readonly connection: Connection) {}

  async save(note: Note): Promise<void> {
    await this.connection.query(
      "INSERT INTO phd.notes (description,fixed) VALUES $1, $2",
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

  async clear(): Promise<void> {
    await this.connection.query("TRUNCATE TABLE phd.notes", []);
  }
}
