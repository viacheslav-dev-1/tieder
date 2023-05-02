import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

export default [
    {
        input: "src/index.js",
        output: [
            { name: "tieder", file: pkg.browser, format: "umd" },
            { file: pkg.module, format: "es" }
        ],
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            babel({
                exclude: ["node_modules/**"]
            }),
            terser()
        ],
    },
    {
        input: "src/index.js",
        output: [
            { file: pkg.main, format: "cjs" }
        ],
        plugins: [
            nodeResolve()
        ]
    },
];