import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { naive } from './naiveui'

const app = createApp(App)

const div = document.createElement('div')
div.id = 'plugin-app'
document.body.append(div)

app
  .use(createPinia())
  .use(naive)
  .mount(div)

console.log('weibo-archiver 加载成功')
