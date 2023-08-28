import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.es.js',
            format: 'es', // 输出格式，这里使用立即执行函数,
        },
        {
            file: 'dist/browser.min.js',
            format: 'umd',
            name: 'VConsoleHide',
            minifyInternalExports: true,
            plugins: [
                terser(),
            ],
        }
    ],
    plugins: [
        typescript(),
        resolve({
            browser: true,
        }),
        json(),
        commonjs(),
    ],
    onwarn(w, log) {
        if (/node_modules\/vconsole/.test(w.id) && w.message.includes('Use of eval in')) {
            return;
        }
        log(w);
    },
});
