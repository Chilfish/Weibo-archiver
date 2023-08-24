import { h, render } from 'vue'
import PreviewVue from '@cp/Preview.vue'

export * from './parse'
export * from './export'

export const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

export async function preview() {
  const container = document.createElement('div')
  const vnode = h(PreviewVue)
  render(vnode, container)

  const app = document.querySelector('#app') || document.querySelector('#preview')!
  app.id = 'preview'
  app.innerHTML = ''
  app.appendChild(container)
}
