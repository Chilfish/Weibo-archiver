import { createApp } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import '@ui/shared.css'
import './electron.css'

const app = createApp(App)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/intro',
    name: 'Intro',
    component: () => import('./pages/intro.vue'),
  },
]

// const _debugRoute: RouteRecordRaw = {
//   path: '/',
//   component: () => import('./pages/intro.vue'),
// }

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // routes: [_debugRoute],
  routes,
})

app
  .use(router)
  .use(createPinia())
  .mount('#app')
