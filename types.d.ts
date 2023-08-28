import VConsole from "vconsole";

export type VConsoleOptions = ConstructorParameters<typeof VConsole>[number]

export interface ListenerClassType {
    vConsole:InstanceType<typeof VConsole> | null
    defaultConfig:Partial<Options>
}

export interface Options {
    vConsole:VConsoleOptions
    touches:number
    max:number
    enable:boolean
    isEnable:(this:ListenerClassType)=> boolean
}

export interface VConsoleHideInstance extends ListenerClassType{
    new (options?:Partial<Options>):ListenerClassType
    (options?:Partial<Options>):ListenerClassType
}
declare const _Instance:VConsoleHideInstance

export default _Instance

declare global {
    const VConsoleHide:VConsoleHideInstance
    interface Window {
        VConsoleHide:VConsoleHideInstance
    }
}
