import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'

import './style.css'

createApp(App)
  .use(routes)
  .use(createHead())
  .use(createPinia())
  .mount('#app')
