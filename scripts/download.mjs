import { existsSync, mkdirSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Buffer } from 'node:buffer'
import { ArgumentParser, RawDescriptionHelpFormatter } from 'argparse'

const parser = new ArgumentParser({ formatter_class: RawDescriptionHelpFormatter })
parser.add_argument('-d', '--dir', { type: String, default: '.', help: '图片列表路径' })
const args = parser.parse_args()

const imgs_path = join(args.dir, 'imgs.csv')

/**
 * 读取图片列表
 */
const url_list = await readFile(imgs_path, 'utf-8')
  .then(text => text.trim().split(',\n'))
  .catch((e) => {
    console.error(`未找到 imgs.csv 文件, ${e}`)
    process.exit(1)
  })

const download_folder = join(args.dir, './assets/img')
if (!existsSync(download_folder))
  mkdirSync(download_folder, { recursive: true })

/**
 * 确认是否为评论图片
 * @param {string} url
 */
const isCommentPic = url => url.startsWith('https://photo.weibo.com/h5/comment')

async function readCookie() {
  const cookie_path = join(args.dir, 'cookies.txt')
  const cookie = await readFile(cookie_path, 'utf-8')

  if (!cookie) {
    console.error(
      '⚠未填写 cookies.txt 文件，将无法下载图片\n',
      '请在浏览器中登录微博，F12 打开控制台，输入 document.cookie，将输出的内容（不含引号）复制到 cookies.txt 文件中',
    )
    process.exit(1)
  }
  return cookie.trim()
}

const cookie = await readCookie()

/**
 * 用于兼容旧版的bug，将评论图片转为真实的图片地址
 * @param {string} url
 */
async function getCommentPic(url) {
  const headers = { Cookie: cookie }
  const res = await fetch(url, { headers })
  const text = await res.text()
  const match = text.match(/src="([^"]+)"/)

  return match?.[1].replace('bmiddle', 'large')
}

/**
 *  下载图片
 * @param {string} url 图片地址
 */
async function download(url) {
  const file_name = url.split('/').pop().split('?')[0]
  const prefix = url.match(/^(?:https?:\/\/)?([^:\/\n]+)/)?.[1]

  if (!prefix)
    return

  const file_path = join(download_folder, `${prefix}-${file_name}`)
  if (existsSync(file_path))
    return

  const headers = { Cookie: cookie }
  const res = await fetch(url, { headers })
  const buffer = await res.arrayBuffer()

  await writeFile(file_path, Buffer.from(buffer))
}

console.log('开始下载图片，请不要关闭')

for (let url of url_list) {
  try {
    if (isCommentPic(url))
      url = await getCommentPic(url)

    await download(url)
  }
  catch (e) {
    console.error(`下载失败：${url}，原因：${e.cause || e.message}`)
  }
}

console.log('下载完成！')
