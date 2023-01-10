import Task from "../../domain/entity/Task";
import TaskRepository, {TaskDatabase, TaskWithNoteFlag} from "../../domain/repository/TaskRepository";
import Connection from "../database/Connection";
import {TaskStatus} from "../../domain/entity/TaskStatus";


export default class TaskRepositoryDatabase implements TaskRepository {
    constructor(readonly connection: Connection) {
    }

    async save(task: Task): Promise<void> {
        await this.connection.query(
            "INSERT INTO phd.tasks (title,about,expected_time,start_at, ended_at, time_spent,status, expected_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
            [
                task.title,
                task.about,
                task.expectedTime,
                task.startAt,
                task.endedAt,
                task.timeSpent,
                task.status,
                task.expectedDate,
            ]
        );
    }

    async todayTasks(): Promise<TaskWithNoteFlag[]> {
        const tasksDatabase = await this.connection.query<TaskDatabase[]>(
            "SELECT task.*, array_agg(tn.id_note) as notes FROM phd.tasks task  LEFT JOIN phd.task_note tn ON tn.id_task = task.id WHERE date(task.start_at) = $1 group by task.id",
            [new Date()]
        );
        const tasks: TaskWithNoteFlag[] = [];
        for (const task of tasksDatabase) {
            tasks.push({
                id: task.id,
                title: task.title,
                about: task.about,
                expectedTime: task.expected_time,
                startAt: task.start_at,
                status: task.status,
                endedAt: task.ended_at,
                timeSpent: task.time_spent,
                expectedDate: task.expected_date,
                hasNotes: !!task.notes.length,
                notes: task.notes
            })
        }
        return tasks;
    }

    async activeTasks(): Promise<TaskWithNoteFlag[]> {
        const tasksDatabase = await this.connection.query<TaskDatabase[]>(
            "SELECT task.*, array_remove(array_agg(tn.id_note), null) as notes FROM phd.tasks task LEFT JOIN phd.task_note tn ON tn.id_task = task.id  WHERE task.status NOT IN ($1, $2) GROUP BY task.id ORDER BY task.id",
            [TaskStatus.REJECTED, TaskStatus.VALIDATED]
        );
        const tasks: TaskWithNoteFlag[] = [];
        for (const task of tasksDatabase) {
            tasks.push({
                id: task.id,
                title: task.title,
                about: task.about,
                expectedTime: task.expected_time,
                startAt: task.start_at,
                status: task.status,
                endedAt: task.ended_at,
                timeSpent: task.time_spent,
                expectedDate: task.expected_date,
                hasNotes: !!task.notes.length,
                notes: task.notes
            })
        }
        return tasks;
    }

    async getAll(): Promise<TaskWithNoteFlag[]> {
        const tasksDatabase = await this.connection.query<TaskDatabase[]>(
            "SELECT task.*, array_agg(tn.id_note) as notes FROM phd.tasks task LEFT JOIN phd.task_note tn ON tn.id_task = task.id GROUP BY task.id ORDER BY task.id",
            []
        );
        const tasks: TaskWithNoteFlag[] = [];
        for (const task of tasksDatabase) {
            tasks.push({
                id: task.id,
                title: task.title,
                about: task.about,
                expectedTime: task.expected_time,
                startAt: task.start_at,
                status: task.status,
                endedAt: task.ended_at,
                timeSpent: task.time_spent,
                expectedDate: task.expected_date,
                hasNotes: !!task.notes.length,
                notes: task.notes
            })
        }
        return tasks;
    }

    async edit(id: number, task: Task): Promise<void> {
        await this.connection.query("UPDATE phd.tasks SET title = $1,about = $2,expected_time = $3,start_at = $4, ended_at = $5, time_spent = $6,status = $7, expected_date = $8 where id = $9",
            [
                task.title,
                task.about,
                task.expectedTime,
                task.startAt,
                task.endedAt,
                task.timeSpent,
                task.status,
                task.expectedDate,
                task.id
            ])
    }

    async remove(id: number, hasNotes: boolean): Promise<void> {
        if (hasNotes) {
            await this.connection.query("DELETE FROM phd.task_note WHERE id_task = $1", [id])
        }
        await this.connection.query("DELETE FROM phd.tasks WHERE id = $1", [id])
    }

    async markAsDone(id: number, timeSpent: number): Promise<void> {
        await this.connection.query("UPDATE phd.tasks SET time_spent = $1, status = $2, ended_at = $3 WHERE id = $4", [timeSpent, TaskStatus.VALIDATED, new Date(), id])
    }

    async getValidatedAndRejected(): Promise<Task[]> {
        const tasksData = await this.connection.query<TaskDatabase[]>("SELECT * FROM phd.tasks WHERE status in($1, $2)", [TaskStatus.VALIDATED, TaskStatus.REJECTED])
        const tasks: Task[] = []
        for (const taskData of tasksData) {
            tasks.push(new Task(taskData.id, taskData.title, taskData.about, taskData.expected_time, taskData.start_at, taskData.status, taskData.expected_date, taskData.ended_at, taskData.time_spent))
        }
        return tasks;
    }
}
