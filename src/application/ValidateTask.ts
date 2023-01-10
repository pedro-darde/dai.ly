import TaskRepository from "../domain/repository/TaskRepository";
import Task from "../domain/entity/Task";
import DateHandler from "../infra/date/DateHandler";

export default class ValidateTask {
    constructor(readonly taskRepository: TaskRepository, readonly dateHandler: DateHandler) {
    }

    async execute(id: number, task: Task) {
        const startAt = new Date(task.startAt)
        const today = new Date()
        const timeSpent = this.dateHandler.difference(today, startAt, "days")
        await this.taskRepository.markAsDone(id, timeSpent)
    }
}