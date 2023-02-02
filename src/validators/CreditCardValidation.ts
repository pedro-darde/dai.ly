import { Validation } from "../presentation/protocols/Validation";

export class CreditCardValidation implements Validation {

    private VALID_CARDS_WITH_REGEX: {[key: string]: RegExp}= {
            "": 123
    }

    validate (input: any, ...extraProps: any) :void | Error {
        const cardNumber = input.cardNumber

        if (!cardNumber) return new Error("Please enter a Card Number")


    }



    
}