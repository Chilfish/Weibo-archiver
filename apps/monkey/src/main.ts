import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'

import 'uno.css'
import './reset.css'

const app = createApp(App)

const div = document.createElement('div')
div.id = 'plugin-app'
document.body.append(div)

app
  .use(createPinia())
  .mount(div)

console.log('weibo-archiver 加载成功')
