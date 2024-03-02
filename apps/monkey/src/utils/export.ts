import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Post } from '@types'

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

const scripts = 'https://github.com/Chilfish/Weibo-archiver/raw/monkey/scripts.zip'

export function exportData(posts: Post[]) {
  // 只能固定版本在 3.9.1，因为油猴的升级
  // https://github.com/Stuk/jszip/issues/864
  const zip = new JSZip()

  const data = JSON.stringify(posts)
  zip.file('weibo-data.json', data)

  const imgsData = Array
    .from(imgsParser(posts))
    .join(',\n') // csv 格式
  zip.file('imgs.csv', imgsData)

  zip
    .generateAsync({ type: 'blob' })
    .then((zipFile) => {
      window.$message.success('导出成功，正在下载数据...')
      saveAs(zipFile, 'weibo-archiver.zip')
    })

  saveAs(scripts, 'scripts.zip')
}
