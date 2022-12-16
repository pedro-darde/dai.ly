import NoteService from "./application/NoteService";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import NoteRepositoryDatabase from "./infra/repository/NoteRepositoryDatabase";

const connection = new PgPromiseAdapter();
const noteRepository = new NoteRepositoryDatabase(connection);
const noteService = new NoteService(noteRepository);
const expressServer = new ExpressAdapter();
new RestController(expressServer, noteService);
expressServer.listen(3000);
