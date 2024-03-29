async function initApp() {
  const App = (await import('./App.vue')).default
  const { createPinia } = await import('pinia')
  const { naive } = await import('./naiveui')
  const { createApp } = await import('vue')

  const app = createApp(App)

  const div = document.createElement('div')
  div.id = 'plugin-app'
  document.body.append(div)

  app
    .use(createPinia())
    .use(naive)
    .mount(div)
}

if (document.location.hostname === 'weibo.com') {
  initApp()
  console.log('weibo-archiver 加载成功')
}
// else {
//   const users = GM_getValue('users') || []

//   localStorage.setItem('users', JSON.stringify(users))
// }
