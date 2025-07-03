import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import './lib/importFromExt'

import './style.css'

createApp(App)
  .use(routes)
  .use(createHead())
  .use(createPinia())
  .mount('#app')
