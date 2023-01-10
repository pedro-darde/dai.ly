import Task from "../domain/entity/Task";
import TaskRepository from "../domain/repository/TaskRepository";

export default class TaskService {
    constructor(readonly taskRepository: TaskRepository) {
    }

    async create(task: Task) {
        await this.taskRepository.save(task);
    }

    async getActives() {
        return await this.taskRepository.activeTasks();
    }

    async update(id: number, data: Task) {
        await this.taskRepository.edit(id, data)
    }

    async remove(id: number, hasNotes: boolean) {
        await this.taskRepository.remove(id, hasNotes)
    }

    async getValidatedAndRejected() {
        return await this.taskRepository.getValidatedAndRejected();
    }

    async getAll() {
        return await this.taskRepository.getAll();
    }
}
