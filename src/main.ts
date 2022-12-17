import NoteService from "./application/NoteService";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import NoteRepositoryDatabase from "./infra/repository/NoteRepositoryDatabase";
import { RequiredFieldValidation } from "./validators/RequiredFieldValidation";

const connection = new PgPromiseAdapter();
const noteRepository = new NoteRepositoryDatabase(connection);
const noteService = new NoteService(noteRepository);
const expressServer = new ExpressAdapter();

const requiredDescription = new RequiredFieldValidation("description");
const requiredFixed = new RequiredFieldValidation("fixed");
new RestController(
  expressServer,
  noteService,
  requiredDescription,
  requiredFixed
);
expressServer.listen(3000);
