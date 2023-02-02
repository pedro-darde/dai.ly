import CardRepository from "../domain/repository/CardRepository";

export default class ListCard {
    constructor (readonly cardRepository: CardRepository) {

    }
    async execute() {
        return await this.cardRepository.list()
    }
}