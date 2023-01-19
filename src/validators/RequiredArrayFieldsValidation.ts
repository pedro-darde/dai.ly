import { Validation } from "../presentation/protocols/Validation";

export default class RequiredArrayFieldsValidation implements Validation {
    constructor (readonly fieldName: string, readonly fields: Array<string>) {}
    validate(input: any) {
        return input[this.fieldName].every(item => [])
    }
}