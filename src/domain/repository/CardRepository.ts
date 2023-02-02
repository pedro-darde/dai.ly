import Card from "../entity/Card";

export default interface CardRepository {
    create (data: Omit<Card, "id">): Promise<void>
    list (): Promise<void>
}


export type CardOnDB = {
    id: number,
    card_name: string,
    owner_name: string,
    number: string,
    flag: string,
    type: "debit" | "credit" | "debit&credit",  
    validateDate: string,
    credit_limit: number
}