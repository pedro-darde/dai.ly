import Task from "../../domain/entity/Task";
import TaskRepository from "../../domain/repository/TaskRepository";
import Connection from "../database/Connection";

export default class TaskRepositoryDatabase implements TaskRepository {
  constructor(readonly connection: Connection) {}

  async save(task: Task): Promise<void> {
    await this.connection.query(
      "INSERT INTO phd.tasks (about,expected_time,start_at, ended_at, time_spent) VALUES ($1,$2,$3,$4,$5",
      [
        task.about,
        task.expectedTime,
        task.startAt,
        task.endedAt,
        task.timeSpent,
      ]
    );
  }

  async todayTasks(): Promise<Task[]> {
    const tasks = await this.connection.query<Task[]>(
      "SELECT * FROM phd.tasks WHERE date(start_at) = $1",
      [new Date()]
    );
    return tasks;
  }
  async getAll(): Promise<Task[]> {
    const tasks = await this.connection.query<Task[]>(
      "SELECT * FROM phd.tasks",
      []
    );
    return tasks;
  }
}
