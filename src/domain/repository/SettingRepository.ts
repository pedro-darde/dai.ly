import Setting, { SettingValueTypes } from "../entity/Setting";

export type SettingResult = {
  value: string;
  id: number;
  key: string;
  value_type: SettingValueTypes;
  description: string;
};

export interface SettingRepository {
  create: (data: Setting[]) => Promise<void>;
  getAll: () => Promise<Setting[]>;
}
