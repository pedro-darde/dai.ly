import NoteService from "./application/NoteService";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import NoteRepositoryDatabase from "./infra/repository/NoteRepositoryDatabase";
import { RequiredFieldValidation } from "./validators/RequiredFieldValidation";
import { ValidationComposite } from "./validators/ValidationComposite";

const connection = new PgPromiseAdapter();
const noteRepository = new NoteRepositoryDatabase(connection);
const noteService = new NoteService(noteRepository);
const expressServer = new ExpressAdapter();

const requiredDescription = new RequiredFieldValidation("description")
new RestController(expressServer, noteService, requiredDescription);
expressServer.listen(3000);
