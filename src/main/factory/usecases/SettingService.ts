import SettingService from "../../../application/SettingService";
import Connection from "../../../infra/database/Connection";
import { makeSettingRepository } from "../repository/SettingRepository";

export const makeSettingService = (connection: Connection) => {
  return new SettingService(makeSettingRepository(connection));
};
