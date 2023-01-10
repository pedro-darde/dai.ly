import NoteTask from "../domain/entity/NoteTask";
import NoteTaskRepository from "../domain/repository/NoteTaskRepository";

export default class NoteTaskService {
    constructor(readonly noteTaskRepository: NoteTaskRepository) {
    }

    async createByNote(idNote: number, tasks: number[]) {
        for (const taskId of tasks) {
            await this.noteTaskRepository.save(new NoteTask(taskId, idNote))
        }
    }

    async removeByNoteAndTasks(idNote: number, tasks: number[]) {
        await this.noteTaskRepository.removeByNoteAndTasks(idNote, tasks)
    }
}