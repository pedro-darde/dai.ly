export type SettingValueTypes = "numeric" | "varchar" | "json" | "boolean";
export default class Setting {
  private id: number | null = null;
  constructor(
    readonly key: string,
    readonly value: string,
    readonly valueType: SettingValueTypes,
    readonly description: string
  ) {
    this.value = this.castValueForCorrectType();
  }

  castValueForCorrectType() {
    switch (this.valueType) {
      case "boolean":
        return this.value === "true" ? true : false;
      case "varchar":
        return this.value;
      case "json":
        return JSON.parse(this.value);
      case "numeric":
        return Number(this.value);
    }
  }

  withId(id: number) {
    this.id = id;
  }
}
