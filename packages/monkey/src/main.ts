import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { naive } from '../../core/src/utils/naiveui'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '../../core/src/main.css'

const app = createApp(App)

const div = document.createElement('div')
div.id = 'plugin-app'
document.body.append(div)

app
  .use(createPinia())
  .use(naive)
  .mount(div)
