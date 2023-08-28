import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import {defineConfig} from 'rollup';

export default defineConfig({
    input: 'src/index.ts', // 替换为你的入口 TypeScript 文件路径
    output:[
        {
            file: 'dist/index.es.js', // 输出文件路径
            format: 'es', // 输出格式，这里使用立即执行函数,
        },
        {
            file: 'dist/browser.min.js', // 输出文件路径
            format: 'umd', // 输出格式，这里使用立即执行函数,
            name:'VConsoleHide',
            minifyInternalExports:true,
            plugins:[
                terser(),
            ],
        }
    ],
    plugins: [
        typescript(),    // 编译 TypeScript 文件
        resolve({
            browser:true,
        }),
        json(),
        commonjs(),
    ],
    onwarn(w, log){
        if(/node_modules\/vconsole/.test(w.id) && w.message.includes('Use of eval in')){
            return
        }
        log(w)
    },
});
