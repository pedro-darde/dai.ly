import _ from 'lodash'
import ObjectHandler from './ObjectHandler';
export default class LodashAdapter implements ObjectHandler {
    getValueByDotString(dotObjectParam: string, dotObject: any) {
        return _.get(dotObject, dotObjectParam)
    }    
}