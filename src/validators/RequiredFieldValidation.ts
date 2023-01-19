import { MissingParamError } from "../presentation/errors/MissingParamError";
import { Validation } from "../presentation/protocols/Validation";

export class RequiredFieldValidation implements Validation {
  fieldName: string;
  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(input: any): Error | void {
    if (
      !input?.hasOwnProperty(this.fieldName) ||
      input[this.fieldName] === ""
    ) {
      return new MissingParamError(this.fieldName);
    }
  }
}
