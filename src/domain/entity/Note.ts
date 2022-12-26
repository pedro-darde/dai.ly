import Task from "./Task";
import TaskNote from "./TaskNote";

export default class Note {
  private tasksNotes: TaskNote[];
  constructor(
    readonly id: number,
    readonly description: string,
    readonly fixed: boolean = false,
    readonly created_at: Date = new Date()
  ) {
    this.tasksNotes = [];
  }

  addTask(task: Task) {
    this.tasksNotes.push(new TaskNote(task.id, this.id));
  }

  getId() {
    return this.id;
  }
}
