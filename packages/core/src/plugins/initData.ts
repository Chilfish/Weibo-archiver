import fs from 'node:fs/promises'
import path from 'node:path'
import { previewDir, src } from '.'

/**
 * init data before build
 */
export function InitData() {
  return {
    name: 'initData',
    async buildStart() {
      const data = path.resolve(src, 'static/data.mjs')
      await fs.writeFile(data, 'export const _ = []\n')

      await fs.rm(
        path.resolve(previewDir, 'public/assets'),
        {
          recursive: true,
          force: true,
        },
      )
    },
  }
}
