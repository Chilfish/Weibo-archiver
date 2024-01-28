import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { previewZip } from '../constants'
import type { Post } from '../types'
import imgsParser from './parse'

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
