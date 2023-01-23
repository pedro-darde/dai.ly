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
import ValidateTask from "./application/ValidateTask";
import NoteTaskService from "./application/NoteTaskService";
import NoteTaskRepositoryDatabase from "./infra/repository/NoteTaskRepositoryDatabase";
import PlanningController from "./infra/controller/PlanningController";
import StartPlanning from "./application/StartPlanning";
import PlanningRepositoryDatabase from "./infra/repository/PlanningRepositoryDatabase";
import RequiredArrayFieldsValidation from "./validators/RequiredArrayFieldsValidation";
import GetPlanning from "./application/GetPlanning";
import GetMonths from "./application/GetMonths";
import MonthRepositoryDatabase from "./infra/repository/MonthRepositoryDatabase";

const dateFnsAdapter = new DateFnsAdapter();
const connection = new PgPromiseAdapter();
const noteRepository = new NoteRepositoryDatabase(connection, dateFnsAdapter);
const noteService = new NoteService(noteRepository);
const expressServer = new ExpressAdapter();
const requiredDescription = new RequiredFieldValidation("description");
const requiredFixed = new RequiredFieldValidation("fixed");

const taskRepository = new TaskRepositoryDatabase(connection);
const taskService = new TaskService(taskRepository);
const validateTask = new ValidateTask(taskRepository, dateFnsAdapter);

const createTaskValidation = new ValidationComposite([
  new RequiredFieldValidation("about"),
  new RequiredFieldValidation("title"),
  new RequiredFieldValidation("status"),
]);

const noteTaskRepository = new NoteTaskRepositoryDatabase(connection);
const noteTaskService = new NoteTaskService(noteTaskRepository);

new NoteController(
  expressServer,
  noteService,
  noteTaskService,
  requiredDescription,
  requiredFixed
);

new TaskController(
  expressServer,
  taskService,
  validateTask,
  createTaskValidation
);
const planningRepository = new PlanningRepositoryDatabase(connection);
const startPlanning = new StartPlanning(planningRepository);
const planningValidations = "year,planningStart,planningTitle,expectedAmount"
  .split(",")
  .map((field) => new RequiredFieldValidation(field));
const createEditPlanningValidation = new ValidationComposite([
  ...planningValidations,
  new RequiredArrayFieldsValidation("months", [
    { type: "string", field: "idMonth" },
    {
      type: "array",
      field: "items",
      extraFields: {
        arrayName: "items",
        parentCount: 0,
        fields: [
          {
            field: "value",
            type: "string",
          },
          {
            field: "date",
            type: "number",
          },
          {
            field: "operation",
            type: "string",
          },
        ],
      },
    },
  ]),
]);

const monthRepository = new MonthRepositoryDatabase(connection);
const getPlanning = new GetPlanning(planningRepository);
const getMonths = new GetMonths(monthRepository);
new PlanningController(
  expressServer,
  startPlanning,
  getPlanning,
  getMonths,
  createEditPlanningValidation
);
expressServer.listen(3000);
