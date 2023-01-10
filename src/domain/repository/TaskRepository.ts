import Task from "../entity/Task";

export type TaskDatabase = {
    id: number,
    title: string,
    about: string,
    expected_time: number,
    start_at: Date,
    ended_at: Date | null,
    time_spent: number | null,
    status: number,
    expected_date: Date | null,
    notes: number[]
}

export type TaskWithNoteFlag = Task & {
    hasNotes: boolean
    notes: number[]
}

export default interface TaskRepository {
    save: (task: Task) => Promise<void>;
    todayTasks: () => Promise<TaskWithNoteFlag[]>;
    activeTasks: () => Promise<TaskWithNoteFlag[]>;
    getAll(): Promise<TaskWithNoteFlag[]>
    edit: (idTask: number, task: Task) => Promise<void>
    remove: (id: number, hasNotes: boolean) => Promise<void>
    markAsDone: (id: number, timeSpent: number) => Promise<void>
    getValidatedAndRejected: () => Promise<Task[]>
}
