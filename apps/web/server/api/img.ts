function returnError(statusCode: number, message: string) {
  return new Response(JSON.stringify({
    statusCode,
    message,
  }), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default defineEventHandler(async (event) => {
  const query = getQuery<{ url?: string }>(event)
  const url = query.url?.trim()

  if (!url)
    return returnError(400, 'url is required.')

  if (!url.includes('crop'))
    return returnError(400, 'url should be an avatar url.')

  const res = await fetch(url, {
    headers: {
      referrer: 'https://weibo.com/',
    },
  }).catch(() => returnError(404, 'image Not Found'))

  // 如果不是图片
  if (!res.headers.get('content-type')?.includes('image'))
    return returnError(res.status, 'image Not Found')

  const blob = await res.blob()

  // cache 7 days
  return new Response(blob, {
    headers: {
      'Content-Type': res.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'max-age=604800',
      'Expires': new Date(Date.now() + 604800000).toUTCString(),
    },
  })
})
