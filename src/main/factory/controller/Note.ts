
import NoteController from "../../../infra/controller/NoteController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { makeNoteService } from "../usecases/Note";
import { makeNoteTaskService } from "../usecases/NoteTask";
export const makeNoteController = (server: HttpServer, connection: Connection): NoteController => {
    const requiredDescription = new RequiredFieldValidation("description");
    const requiredFixed = new RequiredFieldValidation("fixed");
    return new NoteController(server, makeNoteService(connection), makeNoteTaskService(connection), requiredDescription, requiredFixed)
}