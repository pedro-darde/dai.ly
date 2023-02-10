import { Validation } from "../presentation/protocols/Validation";
import validator from 'card-validator'
import InvalidCardNumberError from "../presentation/errors/InvalidCardNumberError";
import InvalidCardCVVError from "../presentation/errors/InvalidCardCVVError";
import InvalidCardExpirationDateError from "../presentation/errors/InvalidCardExpirationDateError";
export class CreditCardValidation implements Validation {

    validate (input: any, ...extraProps: any) :void | Error {
        const cardValid = validator.number(input.number)
        if (!cardValid.isValid) return new InvalidCardNumberError(input.number)
        if (!validator.cvv(input.cvv, cardValid.card?.code.size).isValid) return new InvalidCardCVVError(input.cvv)
        if (!validator.expirationDate(input.validateDate).isValid) return new InvalidCardExpirationDateError(input.validateDate)
        Object.assign(input, { flag: cardValid.card?.type})
    }
}