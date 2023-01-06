import Task from "../domain/entity/Task";
import TaskRepository from "../domain/repository/TaskRepository";

export default class TaskService {
  constructor(readonly taskRepository: TaskRepository) {}

  async create(task: Task) {
    await this.taskRepository.save(task);
  }

  async getTasks() {
    return await this.taskRepository.getAll();
  }
}
