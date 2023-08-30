import { defineConfig } from 'rollup'
import { dts } from 'rollup-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default defineConfig([
  {
    input: 'index.ts',
    output: {
      file: 'core.js',
      format: 'cjs',
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
      format: 'esm',
      file: 'core.d.ts',
    },
  },
])
