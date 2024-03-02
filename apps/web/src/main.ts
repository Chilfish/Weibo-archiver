import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@ui/shared.css'

const app = createApp(App)
const head = createHead()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/p/1',
  },
  {
    path: '/p/:page(\\d+)',
    component: () => import('./Index.vue'),
  },
  {
    path: '/s/:page(\\d+)',
    component: () => import('./Search.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app
  .use(router)
  .use(createPinia())
  .use(head)
  .mount('#app')
