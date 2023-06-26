import Connection from "../../../infra/database/Connection";
import SettingRepositoryDatabase from "../../../infra/repository/SettingRepositoryDatabase";

export const makeSettingRepository = (connection: Connection) => {
  return new SettingRepositoryDatabase(connection);
};
