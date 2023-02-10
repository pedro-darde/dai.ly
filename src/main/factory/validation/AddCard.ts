import { CreditCardValidation } from "../../../validators/CreditCardValidation";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";

export const makeAddCardValidation = (): ValidationComposite => {
    const validations = [
        "cardName", 
        "ownerName", 
        "number", 
        "type", 
        "flag", 
        "validateDate",
        "cvv"
    ].map(field => new RequiredFieldValidation(field))
    return new ValidationComposite([...validations, new CreditCardValidation()])
}