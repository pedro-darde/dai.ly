import { Validation } from "../presentation/protocols/Validation";
import validator, { number as isNumber} from "card-validator";
import InvalidCardNumberError from "../presentation/errors/InvalidCardNumberError";
import InvalidCardCVVError from "../presentation/errors/InvalidCardCVVError";
import InvalidCardExpirationDateError from "../presentation/errors/InvalidCardExpirationDateError";
export class CreditCardValidation implements Validation {
  async validate(input: any, ...extraProps: any): Promise<void | Error> {
    const cardValid = isNumber(input.number);
    if (!cardValid.isValid) return new InvalidCardNumberError(input.number);
    if (!validator.cvv(input.cvv, cardValid.card?.code.size).isValid)
      return new InvalidCardCVVError(input.cvv);
    if (!validator.expirationDate(input.validateDate).isValid)
      return new InvalidCardExpirationDateError(input.validateDate);
    Object.assign(input, { flag: cardValid.card?.type });
  }
}
