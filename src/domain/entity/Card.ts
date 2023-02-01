export default class Card {
  constructor(
    readonly cardName: string,
    readonly ownerName: string,
    readonly number: string,
    readonly flag: string,
    readonly type: "debit" | "credit" | "debit&credit",
    readonly validateDate: string,
    readonly creditLimit?: number,
    readonly id?: number
  ) {}
}
