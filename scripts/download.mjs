import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Buffer } from 'node:buffer'
import { ArgumentParser, RawDescriptionHelpFormatter } from 'argparse'

const parser = new ArgumentParser({ formatter_class: RawDescriptionHelpFormatter })
parser.add_argument('-u', '--uid', { type: String, default: '1111681197', help: '用户 UID' })
parser.add_argument('-d', '--dir', { type: String, default: '.', help: '图片列表路径' })

const args = parser.parse_args()

const referer = `https://weibo.com/u/${args.uid}`
const imgs_path = join(args.dir, 'imgs.csv')

const text = readFileSync(imgs_path, 'utf-8')
const url_list = text.split(',\n') // 图片列表数组

const download_folder = join(args.dir, './assets/img')
if (!existsSync(download_folder))
  mkdirSync(download_folder, { recursive: true })

const isCommentPic = url => url.startsWith('https://photo.weibo.com/h5/comment')

function readCookie() {
  const cookie_path = join(args.dir, 'cookies.txt')
  const cookie = readFileSync(cookie_path, 'utf-8')

  if (!cookie) {
    console.warn(
      '⚠未填写 cookies.txt 文件，将无法下载评论里的图片\n',
      '请在浏览器中登录微博，F12 打开控制台，输入 document.cookie，将输出的内容（不含引号）复制到 cookies.txt 文件中',
    )
  }
  return cookie
}

const cookie = readCookie()

/**
 * 用于兼容旧版的bug，将评论图片转为真实的图片地址
 * @param {string} url
 */
async function getCommentPic(url) {
  const headers = {
    Cookie: cookie,
    Referer: referer,
  }
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

  const headers = { Referer: referer }
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
