import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '../../core/src/styles/main.css'

const app = createApp(App)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/1',
  },
  {
    path: '/:page',
    component: () => import('./Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app
  .use(router)
  .use(createPinia())
  .mount('#app')
