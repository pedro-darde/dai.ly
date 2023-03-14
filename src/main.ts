
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import { makeServer } from "./main/factory/app/server";
import { makeTaskController } from "./main/factory/controller/Task";
import { makeNoteController } from "./main/factory/controller/Note";
import { makePlanningController } from "./main/factory/controller/Planning";
import { makeItemTypeController } from "./main/factory/controller/ItemType";
import { makeCardController } from "./main/factory/controller/Card";
import { makeDashboardController } from "./main/factory/controller/Dashboard";
const connection = new PgPromiseAdapter();
const expressServer = makeServer();
makeTaskController(expressServer, connection)
makeNoteController(expressServer, connection )
makePlanningController(expressServer, connection)
makeItemTypeController(expressServer, connection)
makeCardController(expressServer, connection)
makeDashboardController(expressServer, connection)
expressServer.listen(3335);
