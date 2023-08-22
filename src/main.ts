import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app
  .use(router)
  .use(createPinia())
  .mount((() => {
    const div = document.createElement('div')
    div.id = 'plugin-app'
    document.body.append(div)
    return div
  })(),
  )
