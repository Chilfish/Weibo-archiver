import path from 'node:path'
import copy from 'rollup-plugin-copy'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import type { FilterPattern } from '@rollup/pluginutils'
import type { OutputOptions, RollupOptions } from 'rollup'
import { rollup } from 'rollup'
import type { PluginOption } from 'vite'

import { root } from '../../vite.config'

interface ViteExpressBuilder extends Omit<RollupOptions, 'external'> {
  output?: OutputOptions
  exclude?: FilterPattern
  external?: (string | RegExp)[] | string | RegExp
}

const outDir = path.resolve(root, 'dist/preview/server')

export default function viteExpressBuilder({
  input = './src/server/main.js',
  output = {
    dir: outDir,
    format: 'cjs',
    plugins: [terser()],
  },
  exclude = './src/client/**',
  external = [],
  plugins = [],
  ...rest
}: ViteExpressBuilder = {}): PluginOption {
  return {
    name: 'Vite Express Builder',
    async writeBundle() {
      const config = await rollup({
        input,
        external: [
          'express',
          'vite-express',
          'nodejs-jieba',
          ...Array.isArray(external) ? external : [external],
        ],
        plugins: [
          typescript({
            module: 'ESNext',
            exclude,
          }),
          nodeResolve(),
          commonjs(),
          json(),
          copy({
            targets: [
              { src: 'src/static/package.json', dest: outDir },
            ],
          }),
          ...Array.isArray(plugins) ? plugins : [plugins],
        ],
        ...rest,
      })
      await config.write(output)
    },
  }
}
