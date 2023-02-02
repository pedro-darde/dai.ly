import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";

export const makeAddCardValidation = (): ValidationComposite => {
    const validations = [
        "cardName", 
        "ownerName", 
        "number", 
        "type", 
        "flag", 
        "validateDate"
    ].map(field => new RequiredFieldValidation(field))
    return new ValidationComposite(validations)
}