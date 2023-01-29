export default class ItemType {
  constructor(
    readonly id: number,
    readonly description: string,
    readonly active: boolean = true
  ) {}
}
