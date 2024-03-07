async function getAnonCookie() {
  let token = ''
  const formData = new FormData()
  formData.append('cb', 'visitor_gray_callback')

  await $fetch('https://passport.weibo.com/visitor/genvisitor2', {
    method: 'POST',
    body: formData,
    onResponse({ response }) {
      const cookie = response.headers.getSetCookie() || []
      token = cookie
        .map((item) => {
          const parts = item.split(';')
          return parts[0] // 只获取值
        })
        .join('; ')
    },
  })

  return token
}

export default defineEventHandler(async (event) => {
  const url = event.path.replace('/api/weibo', 'https://weibo.com/ajax')
  const token = await getAnonCookie()

  try {
    const data = await $fetch(url, {
      headers: {
        cookie: token,
      },
    })
    return {
      ...(data as any).data,
      token,
    }
  }
  catch (error: any) {
    console.error(`fetch ${decodeURIComponent(url)} error: ${error.message}`)

    return {
      data: error.message,
      token,
    }
  }
})
