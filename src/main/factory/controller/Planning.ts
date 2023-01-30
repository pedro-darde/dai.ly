import PlanningController from "../../../infra/controller/PlanningController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import RequiredArrayFieldsValidation from "../../../validators/RequiredArrayFieldsValidation";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";
import { makeEditPlanning } from "../usecases/EditPlanning";
import { makeGetMonths } from "../usecases/GetMonths";
import { makeGetPlanning } from "../usecases/GetPlanning";
import { makeStartPlanning } from "../usecases/StartPlanning";

export const makePlanningController = (server: HttpServer, connection: Connection): PlanningController => {
    const planningValidations = "year,planningStart,title,expectedAmount"
  .split(",")
  .map((field) => new RequiredFieldValidation(field));
    const createEditPlanningValidation = new ValidationComposite([
  ...planningValidations,
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
    return new PlanningController(server, makeStartPlanning(connection), makeGetPlanning(connection), makeGetMonths(connection), makeEditPlanning(connection), createEditPlanningValidation)
}