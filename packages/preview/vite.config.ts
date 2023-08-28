import path from 'node:path'
import { defineConfig } from 'vite'
import nodeResolve from '@rollup/plugin-node-resolve'
import config, { core, packages, root } from '../../vite.config'
import viteExpressBuilder from './viteExpressBuilder'

const dataJs = path.resolve(core, 'stores/data.mjs')
const index = path.resolve(packages, 'preview/index.html')

export default defineConfig({
  ...config,
  build: {
    rollupOptions: {
      input: {
        index,
        data: dataJs,
      },
      output: {
        entryFileNames: 'assets/[name].mjs',
        globals: {
          [dataJs]: 'data',
        },
      },
      plugins: [nodeResolve()],
    },
    outDir: path.resolve(root, 'dist/preview/client'),
  },
  plugins: [
    ...config.plugins!,
    viteExpressBuilder(),
  ],
})
