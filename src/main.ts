import NoteService from "./application/NoteService";
import TaskService from "./application/TaskService";
import NoteController from "./infra/controller/NoteController";
import TaskController from "./infra/controller/TaskController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import DateFnsAdapter from "./infra/date/DateFnsAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import NoteRepositoryDatabase from "./infra/repository/NoteRepositoryDatabase";
import TaskRepositoryDatabase from "./infra/repository/TaskRepositoryDatabase";
import {RequiredFieldValidation} from "./validators/RequiredFieldValidation";
import {ValidationComposite} from "./validators/ValidationComposite";
import ValidateTask from "./application/ValidateTask";
import NoteTaskService from "./application/NoteTaskService";
import NoteTaskRepositoryDatabase from "./infra/repository/NoteTaskRepositoryDatabase";
import PlanningController from "./infra/controller/PlanningController";

const dateFnsAdapter = new DateFnsAdapter();
const connection = new PgPromiseAdapter();
const noteRepository = new NoteRepositoryDatabase(connection, dateFnsAdapter);
const noteService = new NoteService(noteRepository);
const expressServer = new ExpressAdapter();
const requiredDescription = new RequiredFieldValidation("description");
const requiredFixed = new RequiredFieldValidation("fixed");

const taskRepository = new TaskRepositoryDatabase(connection)
const taskService = new TaskService(taskRepository)
const validateTask = new ValidateTask(taskRepository, dateFnsAdapter)

const createTaskValidation = new ValidationComposite([
    new RequiredFieldValidation("about"),
    new RequiredFieldValidation("title"),
    new RequiredFieldValidation("status"),

]);

const noteTaskRepository = new NoteTaskRepositoryDatabase(connection)
const noteTaskService = new NoteTaskService(noteTaskRepository)

new NoteController(
    expressServer,
    noteService,
    noteTaskService,
    requiredDescription,
    requiredFixed
);

new TaskController(expressServer, taskService, validateTask, createTaskValidation)


const createEditPlanningValidation = new ValidationComposite([
    new RequiredFieldValidation("year"),
    new RequiredFieldValidation("planningStart"),
    new RequiredFieldValidation("planningTitle"),
    new RequiredFieldValidation("expectedAmount"),
    new RequiredFieldValidation("months.*")
])

new PlanningController(expressServer, [], )

expressServer.listen(3001);
