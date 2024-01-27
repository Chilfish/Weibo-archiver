import path from 'node:path'
import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import config, { core, packages, root } from '../../vite.config'

const dataJs = path.resolve(core, 'constants/data.mjs')
const index = path.resolve(packages, 'preview/index.html')

export default defineConfig({
  ...config,
  build: {
    rollupOptions: {
      ...config.build?.rollupOptions,
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
    },
    outDir: path.resolve(root, 'dist/preview'),
  },
  plugins: [
    ...config.plugins!,
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(root, 'scripts/*')),
          dest: normalizePath(path.resolve(root, 'dist/preview')),
        },
      ],
    }),
  ],
})
