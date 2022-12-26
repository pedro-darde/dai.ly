import Task from "../entity/Task";

export default interface TaskRepository {
  save: (task: Task) => Promise<void>;
  todayTasks: () => Promise<Task[]>;
  getAll: () => Promise<Task[]>;
}
