import JSZip from 'jszip'

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

export async function exportData() {
  const zip = new JSZip()
  const postStore = usePostStore()

  const data = `export const _ = ${JSON.stringify(postStore.posts)}`
  zip.file('data.js', data)

  const imgs = Array
    .from(postStore.imgs)
    .join(',\n') // csv 格式
  zip.file('imgs.csv', imgs)

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'data.zip')
  })
}
