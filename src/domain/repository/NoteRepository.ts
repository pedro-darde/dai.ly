import Note from "../entity/Note";

export default interface NoteRepository {
  save: (note: Note) => Promise<void>;
  getNote: (idNote: number) => Promise<Note>;
  clear: () => Promise<void>;
  getAll: () => Promise<Note[]>;
  changeFix: (idNote: number, fixed: boolean) => Promise<void>;
  deleteNote: (idNote: number) => Promise<void>;
  updateNote: (note: Note, idNote: number) => Promise<void>;
  latestNotes(): Promise<Note[]>;
}
