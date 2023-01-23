import { MismatchTypeError } from "../presentation/errors/MismatchTypeError";
import { MissingParamError } from "../presentation/errors/MissingParamError";
import { Validation } from "../presentation/protocols/Validation";


type Field = {
    type: "string" | "object" | "number",
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
  validate(input: any, extraProps?: ExtraProps): Error| void {
    let count = 0
    let arrayName = this.arrayName
    let fields = this.fields
    if (extraProps) {
        arrayName = extraProps.arrayName
        fields = extraProps.fields
    }
    for (const item of input[arrayName] ) {
        for (const {field, type, extraFields} of fields) {
            let extraMessage = `${this.arrayName}[${extraProps?.parentCount ?? count}]`;
            if (this.arrayName !== arrayName) {
                extraMessage += `.${arrayName}[${count}]`
            }

            if (!item.hasOwnProperty(field) || item[field] === "") {  
                return new MissingParamError(field, extraMessage);
            }

            if (type !== typeof item[field]) {
                return new MismatchTypeError(field, type, typeof item[field], extraMessage)
            }

            if (type === "object") {
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
