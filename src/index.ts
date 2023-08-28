import listener from "./listener"
import {Options} from "../types";
let instance:listener = null
export default class {
    constructor(options?:Options) {
        if(instance){
            return instance
        }
        return  new listener(options)
    }
}
