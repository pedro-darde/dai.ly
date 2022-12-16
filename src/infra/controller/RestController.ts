import NoteService from "../../application/NoteService";
import EntityNotFoundError from "../../presentation/errors/EntityNotFoundError";
import { notFound, ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(readonly server: HttpServer, readonly noteService: NoteService) {
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
  }
}
