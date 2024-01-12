import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { ElMessage } from 'element-plus'
import type { Post } from '../types'
import imgsParser from './parse'

// 同时下载 preview 的 zip 包
async function downloadZip() {
  const url = 'https://api.github.com/repos/chilfish/weibo-archiver/releases/latest'
  const res = await (await fetch(url)).json()
  const zipUrl = res.assets[0].browser_download_url

  saveAs(zipUrl, 'preview.zip')
}

export async function exportData(posts: Post[]) {
  // 只能固定版本在 3.9.1，因为油猴的升级
  // https://github.com/Stuk/jszip/issues/864
  const zip = new JSZip()

  const data = `export const _ = ${JSON.stringify(posts)}`
  zip.file('data.mjs', data)

  const imgsData = Array
    .from(imgsParser(posts))
    .join(',\n') // csv 格式
  zip.file('imgs.csv', imgsData)

  await downloadZip()

  zip
    .generateAsync({ type: 'blob' })
    .then((zipFile) => {
      ElMessage.success({
        message: '导出成功，正在下载数据...',
        duration: 0,
        showClose: true,
      })
      saveAs(zipFile, 'weibo-archiver.zip')
    })
}
