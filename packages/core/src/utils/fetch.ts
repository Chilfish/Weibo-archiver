import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import { getOptions } from './index'

export const aborter = new AbortController()

export async function weiFetch<T extends { data: any }>(
  path: string,
  options?: FetchOptions<'json'>,
) {
  const cookie = typeof document !== 'undefined'
    ? document.cookie
    : (await getOptions()).cookie

  return ofetch<T>(`https://weibo.com/ajax${path}`, {
    headers: {
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
    },
    retry: 3,
    retryDelay: 5000,
    signal: aborter.signal,
    ...options,
  })
}
