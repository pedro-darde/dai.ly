import { MissingParamError } from "../presentation/errors/MissingParamError";
import { Validation } from "../presentation/protocols/Validation";

export default class RequiredArrayFieldsValidation implements Validation {
  constructor(readonly arrayName: string, readonly fields: Array<string>) {}
  validate(input: any) {
    input[this.arrayName].forEach((item: any) => {
      for (const key of this.fields) {
        if (!!item[key]) return new MissingParamError(key, this.arrayName);
      }
    });
  }
}
