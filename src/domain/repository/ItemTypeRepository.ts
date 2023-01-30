import ItemType from "../entity/ItemType";

export default interface ItemTypeRepository {
  list(): Promise<ItemType[]>;
  create(itemType: Omit<ItemType, "id">): Promise<void>;
}
