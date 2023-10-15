import { render } from 'vue'
import PreviewVue from '@weibo-archiver/components/src/Preview.vue'

export * from './parse'
export * from './export'

export const isInMonkey = document ? document.URL.includes('weibo.com') : false

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

export async function preview() {
  const container = document.createElement('div')
  const vnode = h(PreviewVue)
  render(vnode, container)

  const app = document.querySelector('#app')
  if (app) {
    app.innerHTML = ''
    app.appendChild(container.firstElementChild!)
  }
}
