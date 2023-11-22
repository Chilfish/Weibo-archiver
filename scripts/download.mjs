import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Buffer } from 'node:buffer'
import { ArgumentParser, RawDescriptionHelpFormatter } from 'argparse'

const parser = new ArgumentParser({ formatter_class: RawDescriptionHelpFormatter })
parser.add_argument('-u', '--uid', { type: String, default: '1111681197', help: '用户 UID' })
parser.add_argument('-d', '--dir', { type: String, default: '.', help: '图片列表路径' })

const args = parser.parse_args()

const referer = `https://weibo.com/u/${args.uid}`
const imgs_path = join(args.dir, 'imgs.csv')
const download_folder = join(args.dir, './assets/img')

if (!existsSync(download_folder))
  mkdirSync(download_folder, { recursive: true })

const text = readFileSync(imgs_path, 'utf-8')
const url_list = text.split(',\n')

async function download_file(url, file_path) {
  const headers = { Referer: referer }
  const res = await fetch(url, { headers })
  const buffer = await res.arrayBuffer()

  writeFileSync(file_path, Buffer.from(buffer))
}

console.log('开始下载图片，请不要关闭')

for (const url of url_list) {
  try {
    const file_name = url.split('/').pop().split('?')[0]
    const prefix = url.match(/^(?:https?:\/\/)?([^:\/\n]+)/)?.[1]

    if (!prefix) {
      console.error(`无法解析 ${url}`)
      continue
    }

    const file_path = join(download_folder, `${prefix}-${file_name}`)
    if (!existsSync(file_path))
      await download_file(url, file_path)
  }
  catch (e) {
    console.error(e)
  }
}

console.log('下载完成！')
