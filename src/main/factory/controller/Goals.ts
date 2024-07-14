import GoalsController from "../../../infra/controller/GoalsController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import ObjectValidator from "../../../validators/ObjectValidator";
import RequiredArrayFieldsValidation from "../../../validators/RequiredArrayFieldsValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";
import { makeGoalsSerivce } from "../usecases/GoalsService";

export const makeGoalsController = (
  httpServer: HttpServer,
  connection: Connection
) => {
  const goalsValidation = new ValidationComposite([
    new RequiredArrayFieldsValidation("budgets", [
      { type: "number", field: "type" },
      { type: "number", field: "amount" },
    ]),
  ]);

  return new GoalsController(
    httpServer,
    goalsValidation,
    makeGoalsSerivce(connection)
  );
};
