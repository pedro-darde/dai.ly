import Note from "../domain/entity/Note";
import NoteRepository, {
  NoteWithId,
} from "../domain/repository/NoteRepository";

export default class NoteService {
  constructor(readonly noteRepository: NoteRepository) {}

  async getNote(noteId: number): Promise<NoteWithId> {
    const note = await this.noteRepository.getNote(noteId);
    return note;
  }

  async create(data: Note): Promise<void> {
    await this.noteRepository.save(data);
  }
}
