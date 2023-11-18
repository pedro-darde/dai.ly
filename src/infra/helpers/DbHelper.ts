import { isValid } from "date-fns";


const letterRegex = /[a-zA-Z]/g;
export const getObjectArrayAsString = <T>(
  items: Array<T>,
  keys: Array<keyof T>
) => {
  return items
    .map((item) => keys.map((key) => getItemValue(item, key)))
    .map((item) => `(${item.join(",")})`)
    .join(",");
};

export const getValuesString = <T>(obj: T, keys: Array<ArrangeOfSet<T>>) =>
  `(${keys.map(({ itemKey }) => getItemValue(obj, itemKey)).join(", ")})`;

export const getSetForCteByKeys = <T>(
  cteName: string,
  keys: ArrangeOfSet<T>[]
) => {
  return keys
    .map(({ dbKey }) => `${String(dbKey)} = ${cteName}.${String(dbKey)}`)
    .join(",");
};

export const getSetString = <T>(obj: T, keys: ArrangeOfSet<T>[]) =>
  keys
    .map(({ dbKey, itemKey }) => `${dbKey} = ${getItemValue(obj, itemKey)}`)
    .join(",");

export const getSetByKeysValues = <T>(item: T, keys: ArrangeOfSet<T>[]) => {
  return keys
    .map(
      ({ itemKey, dbKey }) =>
        `${String(dbKey)} = ${getItemValue(item, itemKey)}`
    )
    .join(",");
};

const getItemValue = (item: any, key: any) => {
  if (
    !item.hasOwnProperty(key) ||
    item[key] === null ||
    item[key] === "undefined"
  )
    return "null" + (key.startsWith("id") ? "::integer" : "");
  if (typeof item[key] === "number" || !isNaN(+item[key])) return item[key];

console.log(isValid(new Date(item[key])), item[key])

  if (isValid(new Date(item[key])) && !letterRegex.test(item[key])) return `'${item[key]}'::date`;
  return `'${item[key]}'`;
};

export type ArrangeOfSet<T> = {
  itemKey: keyof T;
  dbKey: string;
};
