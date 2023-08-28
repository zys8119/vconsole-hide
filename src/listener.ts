import VConsole from "vconsole"
import {ListenerClassType, Options} from "../types";
import {merge} from "lodash";
export class listenerClass implements ListenerClassType{
    private index = 0
    private x = 0
    private y = 0
    private isCache = false
    private cacheKey = '__vConsoleCache'
    vConsole:InstanceType<typeof VConsole> | null
    config:Options
    defaultConfig:Partial<Options> = {
        max:10,
        touches:4,
        enable:true,
        isEnable:()=> true,
    }
    constructor(options?:Partial<Options>) {
        this.config = merge(this.defaultConfig, options) as Options
        this.isCache = localStorage.getItem(this.cacheKey) === '1'
        this.init()
    }
    private init(){
        this.initVConsole()
        window.addEventListener('wheel', this.reset.bind(this))
        window.addEventListener('mousemove', this.reset.bind(this))
        window.addEventListener('touchmove', this.reset.bind(this))
        window.addEventListener('click', this.headerListener.bind(this))
        window.addEventListener('touchstart', this.headerListener.bind(this))
    }
    private reset(){
        this.index = 0
    }
    private headerListener(ev:TouchEventInit & MouseEvent){
        if(this.index === this.config.max){
            this.isCache = !this.isCache
            this.initVConsole()
            this.reset()
        }
        if(ev?.touches?.length >= this.config.touches || this.x === ev.x && this.y === ev.y){
            this.index += 1
        }else {
            this.reset()
        }
        this.x = ev.x
        this.y = ev.y
    }
    private initVConsole(){
        if(this.isCache ){
            localStorage.setItem(this.cacheKey, '1')
        }else {
            localStorage.removeItem(this.cacheKey)
        }
        if(this.config.enable && this.isCache && this.config.isEnable?.call?.(this)){
            // @ts-ignore
            this.vConsole = window.VConsole || new VConsole(this.config.vConsole)
        }else {
            this.vConsole?.destroy?.()
        }
    }
}
export default listenerClass
