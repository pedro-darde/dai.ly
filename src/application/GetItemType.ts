import ItemTypeRepository from "../domain/repository/ItemTypeRepository";

export default class GetItemType {
    constructor (readonly itemTypeRepository: ItemTypeRepository) {}

    async execute() {
        const items = await this.itemTypeRepository.list()
        return items;
    }
}