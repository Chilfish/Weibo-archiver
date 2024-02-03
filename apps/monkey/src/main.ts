import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { naive } from './naiveui'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@weibo-archiver/core/main.css'

const app = createApp(App)

const div = document.createElement('div')
div.id = 'plugin-app'
document.body.append(div)

app
  .use(createPinia())
  .use(naive)
  .mount(div)
