import { Buffer } from 'node:buffer'
import { existsSync, mkdirSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Argv, PQueue } from './utils.mjs'

const args = Argv.init([
  {
    key: 'imgs_path',
    shortKey: 'i',
    description: 'imgs.csv 的路径',
    defaultValue: path.resolve('imgs.csv'),
    beforeSet: path.resolve,
  },
  {
    key: 'download_folder',
    shortKey: 'o',
    description: '图片保存的文件夹',
    defaultValue: path.resolve('images'),
    beforeSet: path.resolve,
  },
  {
    key: 'concurrency',
    shortKey: 'c',
    description: '同时下载的最大数量',
    defaultValue: 4,
    type: 'number',
  },
  {
    key: 'dealy',
    shortKey: 'd',
    description: '每次下载的间隔时间（秒）',
    defaultValue: 0,
    type: 'number',
  },
], {
  name: 'Weibo-archiver 图片下载器',
  version: '0.4.4',
  description: '下载脚本导出的 imgs.csv 中的图片',
})

// console.log(args)

const {
  imgs_path,
  concurrency,
  delay,
  download_folder,
} = args

const url_list = await readFile(imgs_path, 'utf-8')
  .then(text => text.replace(/\r\n/g, '\n').split(',\n'))
  .catch(() => {
    console.error(`未找到 ${imgs_path} 文件`)
    process.exit(1)
  })

if (!existsSync(download_folder))
  mkdirSync(download_folder, { recursive: true })

console.log(`imgs.csv 文件路径：${imgs_path}\n图片保存路径：${download_folder}`)
console.log(`共有 ${url_list.length} 张图片需要下载，将会跳过已存在的图片，开始下载中... Ctrl+C 可以中断下载。`)

let downloaded = 0
async function download(url) {
  url = url.trim()
  if (!url)
    return

  const file_name = url.split('/').pop().split('?')[0]
  const prefix = url.match(/^(?:https?:\/\/)?([^:/\n]+)/)?.[1]

  if (!prefix)
    throw new Error(`无法获取图片地址`)

  const file_path = path.resolve(download_folder, `${prefix}-${file_name}`)
  if (existsSync(file_path))
    return

  console.log(`正在下载 ${url}`)
  const res = await fetch(url, {
    headers: {
      referrer: 'https://weibo.com/',
    },
  })

  // 如果不是图片，直接返回
  if (!res.headers.get('content-type')?.startsWith('image'))
    return

  const buffer = await res.arrayBuffer()
  await writeFile(file_path, Buffer.from(buffer))
  downloaded++
}

const queue = new PQueue({ concurrency, delay: delay * 1000 })
for (const url of url_list) {
  queue.add(async () => {
    return download(url)
      .catch(e => console.error(`下载失败：${url}，原因：${e.cause || e.message}`))
  })
}
await queue.onIdle()
console.log(`下载完成！${downloaded ? `共下载 ${downloaded} 张图片` : '没有新图片下载'}`)
