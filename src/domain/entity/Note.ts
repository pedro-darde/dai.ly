import Task from "./Task";
import NoteTask from "./NoteTask";

export default class Note {
  private tasksNotes: NoteTask[];
  constructor(
    readonly id: number,
    readonly description: string,
    readonly fixed: boolean = false,
    readonly created_at: Date = new Date()
  ) {
    this.tasksNotes = [];
  }

  addTask(task: Task) {
    this.tasksNotes.push(new NoteTask(task.id, this.id));
  }

  getId() {
    return this.id;
  }
}
