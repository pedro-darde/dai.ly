import NoteService from "./application/NoteService";
import TaskService from "./application/TaskService";
import NoteController from "./infra/controller/NoteController";
import TaskController from "./infra/controller/TaskController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import DateFnsAdapter from "./infra/date/DateFnsAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import NoteRepositoryDatabase from "./infra/repository/NoteRepositoryDatabase";
import TaskRepositoryDatabase from "./infra/repository/TaskRepositoryDatabase";
import { RequiredFieldValidation } from "./validators/RequiredFieldValidation";
import { ValidationComposite } from "./validators/ValidationComposite";

const dateFnsAdapter = new DateFnsAdapter();
const connection = new PgPromiseAdapter();
const noteRepository = new NoteRepositoryDatabase(connection, dateFnsAdapter);
const noteService = new NoteService(noteRepository);
const expressServer = new ExpressAdapter();
const requiredDescription = new RequiredFieldValidation("description");
const requiredFixed = new RequiredFieldValidation("fixed");

const taskRepository = new TaskRepositoryDatabase(connection)
const taskService = new TaskService(taskRepository)

const createTaskValidation = new ValidationComposite([
  new RequiredFieldValidation("about"),
  new RequiredFieldValidation("title"),
  new RequiredFieldValidation("status"),

]);

new NoteController(
  expressServer,
  noteService,
  requiredDescription,
  requiredFixed
);

new TaskController(expressServer, taskService, createTaskValidation)
expressServer.listen(3000);
