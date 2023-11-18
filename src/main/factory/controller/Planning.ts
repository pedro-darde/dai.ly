import PlanningController from "../../../infra/controller/PlanningController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import EditPlanningValidation from "../../../validators/EditPlanningValidation";
import RequiredArrayFieldsValidation from "../../../validators/RequiredArrayFieldsValidation";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";
import { makeEditPlanning } from "../usecases/EditPlanning";
import { makeGetMonths } from "../usecases/GetMonths";
import { makeGetPlanning } from "../usecases/GetPlanning";
import { makeGoalsSerivce } from "../usecases/GoalsService";
import { makeInstallmentService } from "../usecases/InstallmentService";
import { makeStartPlanning } from "../usecases/StartPlanning";
import { makeEditPlanningValidation } from "../validation/EditPlanning";

export const makePlanningController = (
  server: HttpServer,
  connection: Connection
): PlanningController => {
  const planningValidations = ["year","startAt","title","expectedAmount"]
    .map((field) => new RequiredFieldValidation(field));
  const createEditPlanningValidation = new ValidationComposite([
    ...planningValidations,
    new EditPlanningValidation(),
    new RequiredArrayFieldsValidation("months", [
      { type: "number", field: "idMonth" },
      { type: "number", field: "totalIn" },
      { type: "number", field: "totalOut" },
      { type: "number", field: "spentOnDebit" },
      { type: "number", field: "spentOnCredit" },
      {
        type: "object",
        field: "items",
        extraFields: {
          arrayName: "items",
          parentCount: 0,
          fields: [
            {
              field: "value",
              type: "number",
            },
            {
              field: "date",
              type: "string",
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
  return new PlanningController(
    server,
    makeStartPlanning(connection),
    makeGetPlanning(connection),
    makeGetMonths(connection),
    makeEditPlanning(connection),
    makeInstallmentService(connection),
    createEditPlanningValidation,
    makeEditPlanningValidation()
  );
};
