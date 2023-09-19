import SettingService from "../../application/SettingService";
import { ok, serverError } from "../helpers/HttpHelper";
import HttpServer from "../http/HttpServer";

export default class SettingController {
  constructor(
    readonly httpServer: HttpServer,
    readonly settingService: SettingService
  ) {
    httpServer.on("get", "/setting", async function (params, body) {
      try {
        const settings = await settingService.getAll();
        return ok(settings);
      } catch (e: any) {
        console.log("error gettings settings: " , e)
        return serverError(e);
      }
    });
  }
}
