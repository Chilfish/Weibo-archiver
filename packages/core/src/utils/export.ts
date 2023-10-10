import JSZip from 'jszip'
import type { Post } from '../types'
import imgsParser from './parse'

function saveAs(blob: Blob, filename: string) {
  const link = document.createElement('a')
  const body = document.body

  link.href = window.URL.createObjectURL(blob)
  link.download = filename

  // fix Firefox
  link.style.display = 'none'
  body.appendChild(link)

  link.click()
  body.removeChild(link)
}

export async function exportData(posts: Post[]) {
  const zip = new JSZip()

  const data = `export const _ = ${JSON.stringify(posts)}`
  zip.file('data.mjs', data)

  const imgs = imgsParser(posts)

  const imgsData = Array.from(imgs).join(',\n') // csv 格式
  zip.file('imgs.csv', imgsData)

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'data.zip')
  })
}
