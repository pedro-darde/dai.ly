import CardRepository from "../../../domain/repository/CardRepository";
import Connection from "../../../infra/database/Connection";
import { AlreadyExistsError } from "../../../presentation/errors/AlreadyExistsError";
import { CreditCardValidation } from "../../../validators/CreditCardValidation";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import UniqueValidator from "../../../validators/UniqueValidator";
import { ValidationComposite } from "../../../validators/ValidationComposite";
import { makeCardRepository } from "../repository/CardRepository";

export const makeAddCardValidation = (connection: Connection): ValidationComposite => {
    const alreadyExistsValidation = new UniqueValidator("number", "number", "Card", makeCardRepository(connection))
    const validations = [
        "cardName", 
        "ownerName", 
        "number", 
        "type", 
        "flag", 
        "validateDate",
        "cvv"
    ].map(field => new RequiredFieldValidation(field))
    return new ValidationComposite([...validations, new CreditCardValidation(), alreadyExistsValidation])
}