export default class TreeSelect {
  constructor(
    readonly id: number,
    readonly label: number,
    readonly children?: TreeSelect[]
  ) {}
  static toTreeSelectStyle(itens: any[], itemValueKey: string): any[] {
    const mapItems = new Map<number, { children: any[] }>();
    const nestedItems: any[] = [];

    for (const item of itens) {
      item.key = item[itemValueKey];
      item.icon = "pi pi-fw pi-cog";
      mapItems.set(item[itemValueKey], item);
    }

    for (const item of itens) {
      if (item.id_parent) {
        const parent = mapItems.get(item.id_parent);
        if (parent) {
          parent["children"] = parent["children"] || [];
          parent["children"].push(item);
        }
      } else {
        nestedItems.push(item);
      }
    }
    return nestedItems;
  }
}
