import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import { makeServer } from "./main/factory/app/server";
import { makeTaskController } from "./main/factory/controller/Task";
import { makeNoteController } from "./main/factory/controller/Note";
import { makePlanningController } from "./main/factory/controller/Planning";
import { makeItemTypeController } from "./main/factory/controller/ItemType";
import { makeCardController } from "./main/factory/controller/Card";
import { makeDashboardController } from "./main/factory/controller/Dashboard";
import { makeSettingController } from "./main/factory/controller/Setting";
import { makeGoalsController } from "./main/factory/controller/Goals";
import { ok } from "./infra/helpers/HttpHelper";
const connection = new PgPromiseAdapter();
const expressServer = makeServer();
makeTaskController(expressServer, connection);
makeNoteController(expressServer, connection);
makePlanningController(expressServer, connection);
makeItemTypeController(expressServer, connection);
makeCardController(expressServer, connection);
makeDashboardController(expressServer, connection);
makeSettingController(expressServer, connection);
makeGoalsController(expressServer, connection);

expressServer.listen(
  process.env.API_PORT ? parseInt(process.env.API_PORT) : 8080
);

expressServer.on("get", "/", async (params, body) => {
  return ok({ message: "Hello World" });
})

if (process.env.ENV === "production") {
  console.log("vai logar");
  console.log = function (...args: any) {};
  console.log("nao pode logar nada");
}
