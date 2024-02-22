import { ofetch } from 'ofetch'

export const aborter = new AbortController()

const cookie = typeof document !== 'undefined'
  ? document.cookie
  : import.meta.env.VITE_COOKIE

export const weiFetch = ofetch.create({
  baseURL: 'https://weibo.com/ajax',
  headers: {
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  },
  retry: 3,
  retryDelay: 5000,
  signal: aborter.signal,
  // async onResponse({ request, response, options }) {
  //   // Log response
  //   console.log('[fetch response]', request, response.status, response.body)
  // },
})

export async function userInfo(
  id?: string,
  name?: string,
): Promise<{ uid: string, name: string }> {
  const { data } = await weiFetch(`/user/popcard/get?screen_name=${name ?? ''}&id=${id}`, {})
  const { idstr, screen_name } = data || {}

  return {
    uid: idstr,
    name: screen_name,
  }
}
