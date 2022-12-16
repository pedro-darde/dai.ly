import Note from "../entity/Note";

export type NoteWithId = Note & {
  id: number;
};
export default interface NoteRepository {
  save: (note: Note) => Promise<void>;
  getNote: (idNote: number) => Promise<NoteWithId>;
  clear: () => Promise<void>;
}
