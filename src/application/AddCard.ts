import Card from "../domain/entity/Card"
import CardRepository from "../domain/repository/CardRepository"

export default class AddCard {
    constructor(readonly cardRepository: CardRepository)  {

    }
    async execute(input: Input): Promise<void> {
        await this.cardRepository.create(new Card(input.cardName, input.ownerName, input.number, input.flag, input.type, input.validateDate, input.cvv))
    }
}

type Input = {
    cvv: string,
    cardName: string,
    ownerName: string,
    number: string,
    type: any,
    flag: string,
    validateDate: string
}