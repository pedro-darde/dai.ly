import NoteService from "../../application/NoteService";
import EntityNotFoundError from "../../presentation/errors/EntityNotFoundError";
import { Validation } from "../../presentation/protocols/Validation";
import { badRequest, notFound, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly server: HttpServer,
    readonly noteService: NoteService,
    createNoteValidation: Validation
  ) {
    server.on("get", "/note/:idNote", async function (params: any, body: any) {
      try {
        const note = await noteService.getNote(params.idNote);
        if (!note) {
          return notFound(new EntityNotFoundError(params.idNote, "Note"));
        }
        return ok(note);
      } catch (err: any) {
        return serverError(err);
      }
    });
    server.on("post", "/note", async function (params: any, body: any) {
      try {
        const validateErr = createNoteValidation.validate(body);
        if (validateErr) return badRequest(validateErr);
        await noteService.create(body);
        return ok({ message: "Criado com sucesso" });
      } catch (err: any) {
        return serverError(err);
      }
    });
  }
}
