export default class ItemType {
  constructor(
    readonly description: string,
    readonly idParent?: number,
    readonly active: boolean = true,
    readonly id?: number
  ) {}
}
