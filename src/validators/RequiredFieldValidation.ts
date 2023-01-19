import LodashAdapter from "../infra/date/LodashAdapter";
import ObjectHandler from "../infra/date/ObjectHandler";
import { MissingParamError } from "../presentation/errors/MissingParamError";
import { Validation } from "../presentation/protocols/Validation";

export class RequiredFieldValidation implements Validation {
  private  fieldName: string;
  private objectHandler: ObjectHandler
  constructor(fieldName: string) {
    this.fieldName = fieldName;
    this.objectHandler = new LodashAdapter()
  }

  validate(input: any): Error | void {
    
    if (this.fieldName.includes(".")) {
      const ok = this.validateNested(input) 
      if (ok) return ok[0]
      return void 0
    }
    if (
      !input?.hasOwnProperty(this.fieldName) ||
      input[this.fieldName] === ""
    ) {
      return new MissingParamError(this.fieldName);
    }
  }

  validateNested(input: any): Error[] | void {
    const errors: MissingParamError[] = []
    const isArray = this.fieldName.includes("*")
    if (isArray) {
      const [arrayPath, arrayKeysToValidate] = this.fieldName.split("*")
      const arrayValue = this.objectHandler.getValueByDotString(arrayPath.slice(0, -1), input)
      if(!arrayValue) errors.push( new MissingParamError(arrayPath.slice(0, -1)))
      for (const value of arrayValue) {
          if(Array.isArray(value)) throw new Error("Not expected nested arrays")
          this.fieldName = arrayKeysToValidate.substring(1)
          this.validateNested(value)
      }
    } else {
      const valid = !!this.objectHandler.getValueByDotString(this.fieldName, input)
      if (!valid)  errors.push(new MissingParamError(this.fieldName))
    }
    return errors
  }
}
