# vconsole-hide

console调试器隐藏注入

## 调试器隐藏使用说明

> 默认注入到浏览器页面，通过鼠标或移动端touch连续点击开启，具体配置如下：


## 使用

main.ts

```typescript
import VConsoleHide from "vconsole-hide"
new VConsoleHide()
```

浏览器中使用

```javascript
import "vconsole-hide/dist/browser.min.js"
new VConsoleHide()
```

cdn使用

```html
<script src="https://unpkg.com/vconsole-hide@0.0.5/dist/browser.min.js"></script>
<script>
    new VConsoleHide()
</script>
```


## Options

```typescript
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
```
