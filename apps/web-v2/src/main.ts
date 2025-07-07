import { createHead } from '@unhead/vue/client'
import { createTipcHandler } from '@weibo-archiver/core'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { setNamespace, onMessage as window_onMessage } from 'webext-bridge/window'
import { background_window_router } from '../../extension/lib/window/message'

import App from './App.vue'
import routes from './routes'
import './lib/importFromExt'
import './style.css'

setNamespace(window.origin)

createTipcHandler({
  receiver: window_onMessage,
  router: background_window_router(),
})

const app = createApp(App)

app
  .use(routes)
  .use(createHead())
  .use(createPinia())

app.mount('#app')
