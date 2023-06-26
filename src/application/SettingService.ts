import { SettingRepository } from "../domain/repository/SettingRepository";

export default class SettingService {
  constructor(readonly settingRepository: SettingRepository) {}

  async createSettings({ settings }: Input) {
    await this.settingRepository.create(settings);
  }

  async getAll() {
    return await this.settingRepository.getAll();
  }
}

type Input = {
  settings: any[];
};
