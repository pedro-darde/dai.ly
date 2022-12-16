import NoteRepository, {
  NoteWithId,
} from "../domain/repository/NoteRepository";
import EntityNotFoundError from "../infra/errors/http/EntityNotFoundError";

export default class NoteService {
  constructor(readonly noteRepository: NoteRepository) {}

  async getNote(noteId: number): Promise<NoteWithId> {
    const note = await this.noteRepository.getNote(noteId);
    return note;
  }
}
