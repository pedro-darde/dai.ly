import Card from "../entity/Card";
import BaseRepository from "./BaseRepository";

export default interface CardRepository extends BaseRepository {
    create (data: Card): Promise<void>
    list (): Promise<Card[]>
}


export type CardOnDB = {
    cvv: string,
    id: number,
    name: string,
    owner_name: string,
    number: string,
    flag: string,
    type: "debit" | "credit" | "debit&credit",  
    validatedate: string,
    credit_limit: number
}