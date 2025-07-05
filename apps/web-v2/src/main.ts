import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { setNamespace } from 'webext-bridge/window'
import App from './App.vue'
import routes from './routes'

import './lib/importFromExt'
import './style.css'

setNamespace(window.origin)

const app = createApp(App)

app
  .use(routes)
  .use(createHead())
  .use(createPinia())

app.mount('#app')
