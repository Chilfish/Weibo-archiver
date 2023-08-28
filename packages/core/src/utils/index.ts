import { render } from 'vue'
import PreviewVue from '../components/Preview.vue'

export * from './parse'
export * from './export'

export const isInMonkey = document.URL.includes('weibo.com')

export const referrerPolicy = isInMonkey ? 'origin' : 'no-referrer'

const $ = (selector: string) => document.querySelector(selector)

export function delay(ms = 2000) {
  const randomMs = Math.random() * ms + 1000
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

/**
 * 在油猴中 Preview 结果
 */
export async function preview() {
  const container = document.createElement('div')
  const vnode = h(PreviewVue)
  render(vnode, container)

  const app = $('#app') || $('#preview')
  if (app) {
    app.innerHTML = ''
    app.appendChild(container.firstElementChild!)
  }
}
