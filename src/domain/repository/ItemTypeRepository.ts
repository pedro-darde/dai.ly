import ItemType from "../entity/ItemType";

export default interface ItemTypeRepository {
  list(): Promise<ItemType[]>;
  create(itemType: ItemType): Promise<void>;
  update(itemType: ItemType): Promise<void>;
  inAndOut(
    year: number
  ): Promise<{ description: string; spent: number; earn: number }[]>;
  outWithItems(year: number): Promise<any>;
}
