import { MissingParamError } from "../presentation/errors/MissingParamError";
import { Validation } from "../presentation/protocols/Validation";


type Field = {
    type: "string" | "array" | "number",
    field: string
}

type FieldDefinition = Field & {
    extraFields?: ExtraProps
}

type ExtraProps =  {
    fields: Array<FieldDefinition>
    arrayName: string,
    parentCount: number
}

export default class RequiredArrayFieldsValidation implements Validation {
  constructor(readonly arrayName: string, readonly fields: Array<FieldDefinition>) {}
  validate(input: any, extraProps?: ExtraProps| null): Error| void {
    let count = 0
    let arrayName = this.arrayName
    let fields = this.fields
    if (extraProps) {
        arrayName = extraProps.arrayName
        fields = extraProps.fields
    }
    for (const item of input[arrayName] ) {
        for (const {field, type, extraFields} of fields) {
            if (!item[field]) {
                let extraMessage = `${this.arrayName}[${extraProps?.parentCount ?? count}]`;
                if (this.arrayName !== arrayName) {
                    extraMessage += `.${arrayName}[${count}]`
                }
                return new MissingParamError(field, extraMessage);
            }
            if (type === "array") {
                if (extraFields) {
                    extraFields.parentCount = count
                }
                const ok =  this.validate(item, extraFields)
                if (ok) return ok
            }
        }
        count++
    }
  }
}
