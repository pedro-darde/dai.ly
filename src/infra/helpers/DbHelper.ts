export const getObjectArrayAsString = <T>(items: Array<T>, keys: Array<keyof T>) => {
   return items.map(item => keys.map(key =>  item[key] ?  `'${item[key]}'`: null))
               .map(item => `(${item.join(",")})`)
               .join(",")
}

export const getSetForCteByKeys = <T>(tableAlias: string, cteName: string ,  keys: Array<keyof T>) => {
    return keys.map(key => `${tableAlias}.${String(key)} = ${cteName}.${String(key)}`).join(",")
}

export const getSetByKeysValues = <T> (item: T, keys: Array<keyof T>) => {
    return keys.map(key => `${String(key)} = '${item[key]}'`)
               .join(",")
}