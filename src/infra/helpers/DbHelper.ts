import { isDate, isValid, parse } from 'date-fns'
export const getObjectArrayAsString = <T>(items: Array<T>, keys: Array<keyof T>) => {
   return items.map(item => keys.map(key => getItemValue(item, key)))
               .map(item => `(${item.join(",")})`)
               .join(",")
}

export const getSetForCteByKeys = <T>(cteName: string ,  keys: ArrangOfSet<T>[]) => {
    return keys.map(({itemKey, dbKey}) => `${String(dbKey)} = ${cteName}.${String(itemKey)}`).join(",")
}

export const getSetByKeysValues = <T> (item: T, keys: ArrangOfSet<T>[]) => {
    return keys.map(({itemKey, dbKey}) => `${String(dbKey)} = ${getItemValue(item, itemKey)}`)
               .join(",")
}


const getItemValue = (item: any, key: any) => {
    if (!item.hasOwnProperty(key)) return null
    if (typeof item[key] === 'number') return item[key]
    if (isValid(new Date(item[key])))  return `'${item[key]}'::date`
    return `'${item[key]}'`
}


export type ArrangOfSet <T> =  {
    itemKey: keyof T
    dbKey: string
}