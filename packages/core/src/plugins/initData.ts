import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * init data before build
 */
export default function InitData() {
  return {
    name: 'initData',
    async buildStart() {
      const file = path.resolve(__dirname, '../stores/data.js')
      fs.writeFile(file, 'export const _ = []\n')
    },
  }
}
