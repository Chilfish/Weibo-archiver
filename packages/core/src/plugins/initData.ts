import fs from 'node:fs/promises'
import path from 'node:path'
import { packages, previewDir } from '.'

/**
 * init data before build
 */
export function InitData() {
  return {
    name: 'initData',
    async buildStart() {
      const data = path.resolve(packages, 'stores/static/data.mjs')
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
