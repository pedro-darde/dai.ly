import { MissingParamError } from "../presentation/errors/MissingParamError";
import { Validation } from "../presentation/protocols/Validation";

export default class ObjectValidator implements Validation {
  constructor(readonly fieldName: string, readonly objectKeys: string[]) {}
  async validate(input: any, ...extraProps: any): Promise<void | Error> {
    for (const key of this.objectKeys) {
      if (
        !input[this.fieldName]?.hasOwnProperty(key) ||
        input[this.fieldName][key] === ""
      ) {
        return new MissingParamError(
          `Missing param ${key} on ${this.fieldName}`
        );
      }
    }
  }
}
