import { existsSync, mkdirSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import path from 'node:path'

const imgs_path = path.resolve(process.argv[2] || 'imgs.csv')

const url_list = await readFile(imgs_path, 'utf-8')
  .then(text => text.replace(/\r\n/gm, '\n').split(',\n'))
  .catch((e) => {
    console.error(`未找到 imgs.csv 文件, ${e}`)
    process.exit(1)
  })

const download_folder = path.resolve('images')
if (!existsSync(download_folder))
  mkdirSync(download_folder, { recursive: true })

console.log(`imgs.csv 文件路径：${imgs_path}\n图片保存路径：${download_folder}`)
console.log(`共有 ${url_list.length} 张图片需要下载，将会跳过已存在的图片，开始下载中... Ctrl+C 可以中断下载。`)

for (let url of url_list) {
  try {
    url = url.trim()
    if (!url)
      continue

    const file_name = url.split('/').pop().split('?')[0]
    const prefix = url.match(/^(?:https?:\/\/)?([^:\/\n]+)/)?.[1]

    if (!prefix)
      throw new Error(`无法获取图片地址`)

    const file_path = path.resolve(download_folder, `${prefix}-${file_name}`)
    if (existsSync(file_path))
      continue

    const res = await fetch(url, {
      headers: {
        referrer: 'https://weibo.com/',
      },
    })

    // 如果不是图片，直接返回
    if (!res.headers.get('content-type')?.startsWith('image'))
      continue

    const buffer = await res.arrayBuffer()
    await writeFile(file_path, Buffer.from(buffer))
  }
  catch (e) {
    console.error(`下载失败：${url}，原因：${e.cause || e.message}`)
  }
}

console.log('下载完成！')
