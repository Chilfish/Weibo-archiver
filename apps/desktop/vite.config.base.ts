import { join } from 'node:path'
import type { UserConfig } from 'vite'
import { preload } from 'unplugin-auto-expose'
import { chrome, node } from './.electron-vendors.cache.json'

export const PROJECT_ROOT = join(__dirname, '../..')
export const PACKAGES_ROOT = join(PROJECT_ROOT, 'packages')

interface Options {
  target?: 'node' | 'chrome'
}

export function electronViteConfig(
  options: Options = {
    target: 'node',
  },
) {
  let target = `node${node}`
  let base = join(__dirname, 'main')
  let entry = 'main/src/index.ts'
  let plugin: any

  if (options.target === 'chrome') {
    target = `chrome${chrome}`
    base = join(__dirname, 'preload')
    entry = 'preload/src/index.ts'
    plugin = preload.vite()
  }

  return {
    resolve: {
      alias: {
        '@ui': join(PACKAGES_ROOT, 'ui/src'),
        '@core': join(PACKAGES_ROOT, 'core/src'),
        '@database': join(PACKAGES_ROOT, 'database/src'),
      },
    },
    build: {
      ssr: true,
      sourcemap: 'inline',
      target,
      outDir: join(base, 'dist'),
      assetsDir: __dirname,
      minify: process.env.MODE !== 'development',
      lib: {
        entry,
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          entryFileNames: '[name].mjs',
        },
      },
      emptyOutDir: true,
      reportCompressedSize: false,
    },
    plugins: [
      plugin,
    ],
  } as UserConfig
}
