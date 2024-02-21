import { createApp } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import '@ui/shared.css'

const app = createApp(App)

const routes: RouteRecordRaw[] = [{
  path: '/',
  component: () => import('./index.vue'),
}]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

app
  .use(router)
  .mount('#app')
