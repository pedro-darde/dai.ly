import Card from "../entity/Card";

export default interface CardRepository {
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
    validateDate: string,
    credit_limit: number
}