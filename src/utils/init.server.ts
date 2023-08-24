import fs from 'node:fs/promises'
import path from 'node:path'

const src = path.resolve(__dirname, '../')

export function initData() {
  const file = path.resolve(src, 'stores/data.js')
  fs.writeFile(file, 'export const _posts = []\nexport const _imgs = []')
}
