import SettingController from "../../../infra/controller/SettingController";
import Connection from "../../../infra/database/Connection";
import HttpServer from "../../../infra/http/HttpServer";
import { makeSettingService } from "../usecases/SettingService";

export const makeSettingController = (
  server: HttpServer,
  connection: Connection
) => {
  return new SettingController(server, makeSettingService(connection));
};
