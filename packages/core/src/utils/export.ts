import JSZip from 'jszip'
import fileSaver from 'file-saver'
import type { Post } from '@types'
import { imgsParser } from './parse'

export async function exportData(posts: Post[]) {
  if (!posts[0]) {
    window.$message.warning('没有数据可以导出')
    return false
  }

  // 只能固定版本在 3.9.1，因为油猴的升级
  // https://github.com/Stuk/jszip/issues/864
  const zip = new JSZip()

  const name = posts[0].user.screen_name || ''

  const data = JSON.stringify(posts)
  zip.file(`weibo-data-${name}.json`, data)

  const imgsData = Array
    .from(imgsParser(posts))
    .join(',\n') // csv 格式
  zip.file('imgs.csv', imgsData)

  try {
    const zipFile = await zip.generateAsync({ type: 'blob' })
    window.$message.success('导出成功，正在下载数据...')
    fileSaver.saveAs(zipFile, `weibo-archiver-${name}.zip`)
  }
  catch (err) {
    window.$message.error('导出失败')
    console.error('导出失败', err)
    return false
  }

  return true
}
