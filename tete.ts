export const getObjectArrayAsString = <T>(items: Array<T>, keys: Array<keyof T>) => {
    return items.map(item => keys.map(key => getItemValue(item, key)))
                .map(item => `(${item.join(",")})`)
                .join(",")
 }
export const getObjectAsString = (obj: any, keys: any[]) => `(${keys.map(key => getItemValue(obj, key)).join(", ")})`;

const getItemValue = (item: any, key: any) => {
if (!item.hasOwnProperty(key) || item[key] === null) return 'null'
if (typeof item[key] === 'number') return item[key]
return `'${item[key]}'`
}

const obj = {
    name: "robert",
    nickName: "bob"
}

console.log(getObjectAsString(obj, ["nickName", "name"]))