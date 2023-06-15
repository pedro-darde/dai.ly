export default interface BaseRepository {
  beginTransaction: () => Promise<void>;
  commitTransaction: () => Promise<void>;
  rollbackTransaction: () => Promise<void>;
  findByUniqueKey: (uniqueKey: any, value: any) => Promise<any>;
  insert?: <T extends { [key: string]: any }>(data: T) => Promise<void>;
  rawUpdate?: <T extends { [key: string]: any }>(data: T) => Promise<void>;
}

export type DbKeysToInsery = string[];
