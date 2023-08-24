import PreviewVue from '@cp/Preview.vue'
import JSZip from 'jszip'
import { createVNode, render } from 'vue'

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

  zip.file('data.js', `export const posts = ${JSON.stringify(postStore.posts)}`)
  zip.file('imgs.txt', postStore.imgs.join(',\n'))

  const html = await exportHTML()
  zip.file('index.html', html)

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'exporter.zip')
  })
}

async function exportHTML() {
  const container = document.createElement('div')
  const vnode = createVNode(PreviewVue)
  render(vnode, container)
  return container.innerHTML
}
