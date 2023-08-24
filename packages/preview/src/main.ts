import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '../../core/src/styles/main.css'

const app = createApp(App)

app
  .use(createPinia())
  .mount('#app')
