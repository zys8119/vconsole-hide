import VConsole from "vconsole"
import {ListenerClassType, Options} from "../types";
import {merge} from "lodash";
import isMobile from "./isMobile";
export class listenerClass implements ListenerClassType{
    private index = 0
    private x = 0
    private y = 0
    private isCache = false
    private cacheKey = '__vConsoleCache'
    private validTime = 0
    vConsole:InstanceType<typeof VConsole> | null
    config:Options
    defaultConfig:Partial<Options> = {
        max:10,
        touches:4,
        enable:true,
        isEnable:()=> true,
        validTime:3600000
    }
    constructor(options?:Partial<Options>) {
        this.config = merge(this.defaultConfig, options) as Options
        this.isCache = localStorage.getItem(this.cacheKey) === '1'
        this.init()
    }
    private init(){
        this.initVConsole()
        if(isMobile()){
            window.addEventListener('touchmove', this.reset.bind(this))
            window.addEventListener('touchstart', this.headerListener.bind(this))
        }else {
            window.addEventListener('wheel', this.reset.bind(this))
            window.addEventListener('mousemove', this.reset.bind(this))
            window.addEventListener('click', this.headerListener.bind(this))
        }
    }
    private reset(){
        this.index = 0
    }
    private headerListener(ev:TouchEventInit & MouseEvent){
        if(this.index === this.config.max){
            this.isCache = !this.isCache
            if(this.isCache){
                this.validTime = Date.now()
            }
            this.initVConsole()
            this.reset()
        }
        if(isMobile()){
            if(ev?.touches?.length >= this.config.touches){
                this.index += 1
            }
        }else {
            if(this.x === ev.x && this.y === ev.y){
                this.index += 1
            }else {
                this.reset()
            }
        }
        this.x = ev.x
        this.y = ev.y
    }
    private initVConsole(){
        const isValidTime = this.isCache && (typeof this.config.validTime !== 'number' || typeof this.config.validTime === 'number' && Date.now() - this.validTime < this.config.validTime)
        if(this.isCache && isValidTime){
            localStorage.setItem(this.cacheKey, '1')
        }else {
            localStorage.removeItem(this.cacheKey)
        }
        if(this.config.enable && this.isCache && isValidTime && this.config.isEnable?.call?.(this)){
            // @ts-ignore
            this.vConsole = window.VConsole || new VConsole(this.config.vConsole)
        }else {
            this.vConsole?.destroy?.()
        }
    }
}
export default listenerClass
