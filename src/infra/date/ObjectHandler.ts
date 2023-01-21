export default interface ObjectHandler {
    getValueByDotString(dotObjectProp: string, object: any): any
}