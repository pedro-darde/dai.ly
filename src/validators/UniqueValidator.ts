import BaseRepository from "../domain/repository/BaseRepository";
import { AlreadyExistsError } from "../presentation/errors/AlreadyExistsError";
import LogError from "../presentation/errors/LogError";
import { Validation } from "../presentation/protocols/Validation";

export default class UniqueValidator implements Validation {
  constructor(
    readonly inputKeyName: string,
    readonly uniqueKeyName: string,
    readonly entityName: string,
    readonly repository: BaseRepository
  ) {}
  async validate(input: any): Promise<void | Error> {
    const exists = await this.repository.findByUniqueKey(
      this.uniqueKeyName,
      input[this.inputKeyName]
    );

    if (exists && exists.length) {
      return new LogError("UniqueKeyError", {
        key: this.uniqueKeyName,
        entity: this.entityName,
      });
    }
  }
}
