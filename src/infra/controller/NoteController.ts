import NoteService from "../../application/NoteService";
import EntityNotFoundError from "../../presentation/errors/EntityNotFoundError";
import {Validation} from "../../presentation/protocols/Validation";
import {badRequest, notFound, ok, serverError} from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";
import NoteTaskService from "../../application/NoteTaskService";

export default class RestController {
    constructor(
        readonly server: HttpServer,
        readonly noteService: NoteService,
        readonly noteTaskService: NoteTaskService,
        readonly requiredDescription: Validation,
        readonly fixNoteValidation: Validation
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
                const validateErr = await requiredDescription.validate(body);
                if (validateErr) return badRequest(validateErr);
                const id = await noteService.create(body, !!body.tasks?.length);
                if (id) {
                    await noteTaskService.createByNote(id, body.tasks)
                }
                return ok({message: "Criado com sucesso"});
            } catch (err: any) {
                return serverError(err);
            }
        });
        server.on("get", "/note", async function (params: any, body: any) {
            try {
                const notes = await noteService.getAll();
                return ok(notes);
            } catch (err: any) {
                return serverError(err);
            }
        });
        server.on(
            "post",
            "/changeFix/:idNote",
            async function (params: any, body: any) {
                try {
                    const error = await fixNoteValidation.validate(body);
                    if (error) return badRequest(error);
                    const exists = await noteService.getNote(params.idNote);
                    if (!exists)
                        return notFound(new EntityNotFoundError(params.idNote, "Note"));
                    await noteService.changeFix(params.idNote, body.fixed);
                    return ok({message: "Fixed change"});
                } catch (err: any) {
                    return serverError(err);
                }
            }
        );
        server.on(
            "delete",
            "/note/:idNote",
            async function (params: any, body: any) {
                try {
                    await noteService.deleteNote(params.idNote);
                    if (body.tasks?.length) {
                        await noteTaskService.removeByNoteAndTasks(params.idNote, body.tasks)
                    }
                    return ok({message: "Note deleted"});
                } catch (err: any) {
                    console.error(err);
                    return serverError(err);
                }
            }
        );
        server.on("patch", "/note/:idNote", async function (params: any, body: any) {
            try {
                const error = await requiredDescription.validate(body);
                if (error) return badRequest(error);
                await noteService.updateNote(body, params.idNote);
                if (body.tasksToRemove?.length) await noteTaskService.removeByNoteAndTasks(params.idNote, body.tasksToRemove)
                if (body.tasksToInsert?.length) await noteTaskService.createByNote(params.idNote, body.tasksToInsert)
                return ok({message: "Note updated"});
            } catch (err: any) {
                console.error(err)
                return serverError(err);
            }
        });

        server.on("get", "/latests", async function (params: any, body: any) {
            try {
                const notes = await noteService.latestNotes();
                return ok(notes);
            } catch (err: any) {
                console.log(err)
                return serverError(err);
            }
        });
    }
}
