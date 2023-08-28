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

export interface Instance extends ListenerClassType{
    new (options?:Options):ListenerClassType
}

export default Instance
