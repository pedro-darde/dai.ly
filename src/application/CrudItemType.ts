import ItemType from "../domain/entity/ItemType";
import ItemTypeRepository from "../domain/repository/ItemTypeRepository";

export default class CrudItemType {
  constructor(readonly itemTypeRepository: ItemTypeRepository) {}

  async create(data: InputAddEdit) {
    const itemType = new ItemType(
      data.description,
      data.parent_id,
      data.active
    );

    await this.itemTypeRepository.create(itemType);
  }

  async update(id: number, data: InputAddEdit) {
    const itemType = new ItemType(
      data.description,
      data.parent_id,
      data.active,
      id
    );
    await this.itemTypeRepository.update(itemType);
  }
}

type InputAddEdit = {
  active: boolean;
  description: string;
  parent_id?: number;
};
