import { render } from 'vue'
import PreviewVue from '../components/Preview.vue'

export * from './parse'
export * from './export'

export const isInMonkey = document.URL.includes('weibo.com')

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

const $ = (selector: string) => document.querySelector(selector)

export function delay(ms: number) {
  const randomMs = Math.random() * ms
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

export async function preview() {
  const container = document.createElement('div')
  const vnode = h(PreviewVue)
  render(vnode, container)

  const app = $('#app') || $('#preview')
  if (app) {
    app.innerHTML = ''
    app.appendChild(container)
  }
}
