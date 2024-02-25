import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Post } from '@types'

const version = '0.2.3'

function imgsParser(posts: Post[]): Set<string> {
  const imgs = posts
    .map((post) => {
      return [
        post.imgs,
        post.retweeted_status?.imgs,
        post.comments.map(e => e.img),
        post.user?.profile_image_url,
        post.card?.img,
      ].flat()
    })
    .flat()
    .filter((e): e is string => !!e)

  return new Set(imgs)
}

/**
 * 预览压缩包下载地址
 */
const previewZip = `https://github.com/Chilfish/Weibo-archiver/releases/download/v${version}/preview.zip`

export function exportData(posts: Post[]) {
  // 只能固定版本在 3.9.1，因为油猴的升级
  // https://github.com/Stuk/jszip/issues/864
  const zip = new JSZip()

  const data = `export const _ = ${JSON.stringify(posts)}`
  zip.file('data.mjs', data)

  const imgsData = Array
    .from(imgsParser(posts))
    .join(',\n') // csv 格式
  zip.file('imgs.csv', imgsData)

  zip
    .generateAsync({ type: 'blob' })
    .then((zipFile) => {
      // @ts-expect-error is defined
      window.$message.success('导出成功，正在下载数据...')
      saveAs(zipFile, 'weibo-archiver.zip')
    })
  saveAs(previewZip, 'preview.zip')
}
