import VConsole from "vconsole";

export type VConsoleOptions = ConstructorParameters<typeof VConsole>[number]

export interface ListenerClassType {
    vConsole:InstanceType<typeof VConsole> | null
    defaultConfig:Partial<Options>
}

export interface Options {
    vConsole:VConsoleOptions
    // 限制移动端触发触点个数，默认4指同时点击max次数，即默认10次
    touches:number
    // 最大连续点击次数
    max:number
    // 是否启用
    enable:boolean
    // 启用自定义规则
    isEnable:(this:ListenerClassType)=> boolean
    // 开启后的有效期，默认一小时内，单位毫秒
    validTime?:number
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
