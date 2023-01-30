
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import { makeServer } from "./main/factory/app/server";
import { makeTaskController } from "./main/factory/controller/Task";
import { makeNoteController } from "./main/factory/controller/Note";
import { makePlanningController } from "./main/factory/controller/Planning";
const connection = new PgPromiseAdapter();
const expressServer = makeServer();
makeTaskController(expressServer, connection)
makeNoteController(expressServer, connection )
makePlanningController(expressServer, connection)
expressServer.listen(8000);
