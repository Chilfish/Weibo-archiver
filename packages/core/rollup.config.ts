import path from 'node:path'
import { defineConfig } from 'rollup'
import { dts } from 'rollup-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const dist = path.resolve(__dirname, '../../dist/core')

export default defineConfig([
  {
    input: 'index.ts',
    output: {
      file: `${dist}/core.js`,
      format: 'esm',
      plugins: [terser()],
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'index.ts',
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
    output: {
      file: `${dist}/core.d.ts`,
      format: 'esm',
    },
  },
])
