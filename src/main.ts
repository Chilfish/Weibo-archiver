import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'

const app = createApp(App)

app
  .use(createPinia())
  .mount((() => {
    const div = document.createElement('div')
    div.id = 'plugin-app'
    document.body.append(div)
    return div
  })(),
  )
