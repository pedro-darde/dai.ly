import Card from "../../domain/entity/Card";
import CardRepository, { CardOnDB } from "../../domain/repository/CardRepository";
import Connection from "../database/Connection";

export default class CardRepositoryDatabase implements CardRepository {
    constructor (readonly connection: Connection) {}

    async create(card: Card ): Promise<void> {
        await this.connection.query("INSERT INTO phd.card (name, owner_name, number, flag, type, validateDate, cvv) VALUES ($1,$2,$3,$4,$5,$6,$7)", [card.cardName , card.ownerName, card.number, card.flag, card.type, card.validateDate, card.cvv])
    }

    async list(): Promise<Card[]> {
        const data = await this.connection.query<CardOnDB[]>("SELECT * FROM phd.card", []);
        return data.map(item => new Card(item.name, item.owner_name, item.number, item.flag, item.type, item.validateDate, item.cvv, item.id))
    }
}