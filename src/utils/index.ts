import { h, render } from 'vue'
import PreviewVue from '@cp/Preview.vue'

export * from './parse'
export * from './export'

export function delay(ms: number) {
  const randomMs = Math.random() * ms
  return new Promise(resolve => setTimeout(resolve, randomMs))
}

export async function preview() {
  const container = document.createElement('div')
  const vnode = h(PreviewVue)
  render(vnode, container)

  const app = document.querySelector('#preview')!
  app.innerHTML = ''
  app.appendChild(container)
}
