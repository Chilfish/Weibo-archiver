import path from 'node:path'
import { defineConfig } from 'vite'
import nodeResolve from '@rollup/plugin-node-resolve'
import config, { core, packages, root } from '../../vite.config'

const dataJs = path.resolve(core, 'stores/data.js')
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
        entryFileNames: 'assets/[name].js',
        globals: {
          [dataJs]: 'data',
        },
      },
      plugins: [nodeResolve()],
    },
    outDir: path.resolve(root, 'dist/preview'),
  },
})
