import fs from 'node:fs/promises'
import path from 'node:path'
import { previewDir, src } from '.'

/**
 * init data before build
 */
export default function InitData() {
  return {
    name: 'initData',
    async buildStart() {
      const file = path.resolve(src, 'stores/data.js')
      await fs.writeFile(file, 'export const _ = []\n')
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
