import NoteTask from "../entity/NoteTask";

export default interface NoteTaskRepository {
    save(taskNote: NoteTask): Promise<void>
    removeByNoteAndTasks(noteId: number, tasks: number[]): Promise<void>
}