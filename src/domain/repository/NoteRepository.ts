import Note from "../entity/Note";

export type NoteWithId = Note & {
  id: number;
};
export default interface NoteRepository {
  save: (note: Note) => Promise<void>;
  getNote: (idNote: number) => Promise<NoteWithId>;
  clear: () => Promise<void>;
  getAll: () => Promise<NoteWithId[]>;
  changeFix: (idNote: number, fixed: boolean) => Promise<void>;
  deleteNote: (idNote: number) => Promise<void>;
  updateNote: (note: Note, idNote: number) => Promise<void>;
  latestNotes(): Promise<NoteWithId[]>;
}
