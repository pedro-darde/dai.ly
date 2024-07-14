import EditPlanning from "../../application/EditPlanning";
import GetMonths from "../../application/GetMonths";
import GetPlanning from "../../application/GetPlanning";
import GoalsService from "../../application/GoalsService";
import InstallMentservice from "../../application/InstallmentService";
import RemovePlanningItem from "../../application/RemovePlanningItem";
import StartPlanning from "../../application/StartPlanning";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class PlanningController {
  constructor(
    readonly httpServer: HttpServer,
    readonly startPlanning: StartPlanning,
    readonly getPlanning: GetPlanning,
    readonly getMonths: GetMonths,
    readonly editPlanning: EditPlanning,
    readonly removeItem: RemovePlanningItem,
    readonly installmentService: InstallMentservice,
    readonly createPlanningValidation: Validation,
    readonly editPlanningValidation: Validation
  ) {
    httpServer.on("post", "/planning", async function (params, body) {
      try {
        const errors = await createPlanningValidation.validate(body);
        if (errors) return badRequest(errors);
        await startPlanning.execute(body);
        return ok({ message: "Planning created" });
      } catch (e: any) {
        console.log(e);
        return serverError(e);
      }
    });

    httpServer.on("get", "/planning/:year", async function (params, body) {
      try {
        const planning = await getPlanning.execute(params.year);
        return ok(planning);
      } catch (e: any) {
        console.log(e);
        return serverError(e);
      }
    });

    httpServer.on("patch", "/planning/:year", async function (params, body) {
      try {
        const error = await editPlanningValidation.validate(body);
        if (error) return badRequest(error);
        await editPlanning.execute(params.year, body);

        return ok({ message: "Planning Edited" });
      } catch (e: any) {
        console.log(e);
        return serverError(e);
      }
    });

    httpServer.on("get", "/months", async function (params, body) {
      try {
        const months = await getMonths.execute();
        return ok(months);
      } catch (e: any) {
        console.error(e);
        return serverError(e);
      }
    });

    httpServer.on(
      "post",
      "/planning/:year/installments",
      async function (params, body) {
        try {
          await installmentService.execute(body);
          if (body.willCreatePlanningAndMonthPlanning) {
            for await (const planning of body.willCreatePlanningAndMonthPlanning) {
              await startPlanning.execute(planning);
            }
          }
          return ok({ message: "Installments created." });
        } catch (e: any) {
          console.log(e);
          return serverError(e);
        }
      }
    );

    httpServer.on("post", "/planning/:year/item", async function (_, body) {
      try {
        await editPlanning.createMoviment(body);
        return ok({ message: "Item created" });
      } catch (e: any) {
        console.log(e);
        return serverError(e);
      }
    });
    httpServer.on(
      "put",
      "/planning/:year/item/:idPlanningMonthItem",
      async function (params, body) {
        try {
          await editPlanning.editMoviment(body);
          return ok({ message: "Item edited" });
        } catch (e: any) {
          console.log(e);
          return serverError(e);
        }
      }
    );
    httpServer.on(
      "delete",
      "/planning/:year/item/:idPlanningMonthItem",
      async function (params, body) {
        console.log(params);
        try {
          await removeItem.execute({
            id: params.idPlanningMonthItem,
          });
          return ok({ message: "Item removed" });
        } catch (e: any) {
          console.log(e);
          return serverError(e);
        }
      }
    );
  }
}
