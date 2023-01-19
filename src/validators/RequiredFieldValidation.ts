import LodashAdapter from "../infra/date/LodashAdapter";
import ObjectHandler from "../infra/date/ObjectHandler";
import { MissingParamError } from "../presentation/errors/MissingParamError";
import { Validation } from "../presentation/protocols/Validation";
import {each} from "lodash";

export class RequiredFieldValidation implements Validation {
  private  fieldName: string;
  private objectHandler: ObjectHandler
  private originalFieldName: string
  constructor(fieldName: string) {
    this.fieldName = fieldName;
    this.objectHandler = new LodashAdapter()
    this.originalFieldName = fieldName
  }

  validate(input: any): Error | void {

    if (this.fieldName.includes(".")) {
      const [first, ..._] = this.fieldName.split(".")
      this.originalFieldName = first
      const ok = this.validateNested(input)
      if (ok) {
        return ok
      }
      return
    }

    if (this.fieldName.includes((","))) {
      for (const field of this.fieldName.split(",")) {
        this.fieldName = field
        const ok = this.validate(input)
        if (ok) return ok
      }
      return
    }

    if (
      !input?.hasOwnProperty(this.fieldName) ||
      input[this.fieldName] === ""
    ) {
      return new MissingParamError(this.fieldName);
    }
  }

validateNested(input: any, arrayPath: string|undefined = "", valueCount: number = 0): Error | void {
    const isArray = this.fieldName.includes("*")
    if (isArray) {
      let [arrayPath, ...arrayKeysToValidate] = this.fieldName.split("*")
      let keysToValidate = arrayKeysToValidate.join("*")
      keysToValidate = keysToValidate.substring(1)
      const arrayValue = this.objectHandler.getValueByDotString(arrayPath.slice(0, -1), input)
      if (!arrayValue) return new MissingParamError(arrayPath.slice(0, -1))
      let idxCount = 0;
      for (const value of arrayValue) {
        for (const key of keysToValidate.split(",")) {
          this.fieldName = key
          const error = this.validateNested(value, arrayPath, idxCount)
          if (error) return error
        }
        idxCount++
      }
    } else {
      const valid = !!this.objectHandler.getValueByDotString(this.fieldName, input)
      if (!valid) {
        let extraMessage = `${this.originalFieldName}[${valueCount}]`
        if (arrayPath[arrayPath?.length - 1] === ".") arrayPath = arrayPath?.substring(0, -1)
        if (this.originalFieldName !== arrayPath) {
          extraMessage += `.${arrayPath}`
        }
        return new MissingParamError(this.fieldName, extraMessage)
      }
    }
  }
}
