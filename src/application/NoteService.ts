import Note from "../domain/entity/Note";
import NoteRepository from "../domain/repository/NoteRepository";

export default class NoteService {
  constructor(readonly noteRepository: NoteRepository) {}

  async getNote(noteId: number): Promise<Note> {
    const note = await this.noteRepository.getNote(noteId);
    return note;
  }

  async create(data: Note): Promise<void> {
    await this.noteRepository.save(data);
  }

  async getAll(): Promise<Note[]> {
    return await this.noteRepository.getAll();
  }

  async changeFix(noteId: number, fixed: boolean): Promise<void> {
    await this.noteRepository.changeFix(noteId, fixed);
  }

  async deleteNote(noteId: number): Promise<void> {
    await this.noteRepository.deleteNote(noteId);
  }

  async updateNote(note: Note, idNote: number) {
    await this.noteRepository.updateNote(note, idNote);
  }

  async latestNotes(): Promise<Note[]> {
    return await this.noteRepository.latestNotes();
  }
}
