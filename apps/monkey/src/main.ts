import { createApp } from 'vue'

import App from './App.vue'

import './style.css'

const app = createApp(App)

const div = document.createElement('div')
div.id = 'plugin-app'
document.body.append(div)

app.mount(div)

console.log('weibo-archiver 加载成功')
