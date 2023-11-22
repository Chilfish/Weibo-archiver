import fsPromises from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import { _ as data } from './assets/data.mjs'
import { _ as data1 } from './data.mjs'

console.log(`开始合并，原大小: 原本的 ${data.length} 条，新增的 ${data1.length} 条`)

const merged = [...data, ...data1].filter((item, index, self) => {
  return item.id && self.findIndex(t => t.id === item.id) === index // 去重
})

await fsPromises.writeFile(
  path.join(process.cwd(), 'assets/data.mjs'),
  `export const _ = ${JSON.stringify(merged)}`,
)

console.log(`完成！合并后的大小: ${merged.length} 条`)
