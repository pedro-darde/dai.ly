import NoteService from "../../application/NoteService";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(readonly server: HttpServer, readonly noteService: NoteService) {
    server.on("post", "/note", function () {
      try {
      } catch (err) {
          
      }
    });
  }
}
