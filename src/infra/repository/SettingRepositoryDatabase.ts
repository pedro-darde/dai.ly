import Setting from "../../domain/entity/Setting";
import {
  SettingRepository,
  SettingResult,
} from "../../domain/repository/SettingRepository";
import Connection from "../database/Connection";
import { getObjectArrayAsString } from "../helpers/DbHelper";

export default class SettingRepositoryDatabase implements SettingRepository {
  constructor(readonly connection: Connection) {}
  async create(data: Setting[]): Promise<void> {
    const keys: (keyof Setting)[] = ["key", "value", "valueType"];
    const dbKeys = ["key", "value", "value_type"];
    const bulkStr = getObjectArrayAsString(data, keys);
    await this.connection.query(
      `INSERT INTO phd.setting (${dbKeys.join(",")}) VALUES $1`,
      [bulkStr]
    );
  }
  async getAll(): Promise<Setting[]> {
    const data = await this.connection.query<SettingResult[]>(
      "SELECT * FROM phd.setting",
      []
    );

    const settings: Setting[] = [];

    for (const setting of data) {
      const settingModel = new Setting(
        setting.key,
        setting.value,
        setting.value_type,
        setting.description
      );
      settingModel.withId(setting.id);
      settings.push(settingModel);
    }
    return settings;
  }
}
