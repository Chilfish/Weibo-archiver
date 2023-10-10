import path from 'node:path'
import { defineConfig } from 'vite'
import copy from 'rollup-plugin-copy'
import config, { core, packages, root } from '../../vite.config'

const dataJs = path.resolve(core, 'static/data.mjs')
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
      plugins: [
        copy({
          targets: [
            {
              src: '../../scripts/**',
              dest: '../../dist/preview/scripts',
            },
          ],
        }),
      ],
    },
    outDir: path.resolve(root, 'dist/preview'),
  },
  plugins: [
    ...config.plugins!,
  ],
})
