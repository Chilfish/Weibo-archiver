import type { FetchOptions } from './types'
import Axios, { type AxiosRequestConfig } from 'axios'

const axios = Axios.create({
  baseURL: 'https://weibo.com/ajax',
})

export async function weiFetch<T = { data: any }>(
  path: string,
  options?: AxiosRequestConfig,
) {
  const fetchOptions: FetchOptions = (globalThis as any).fetchOptions ?? {}

  const proxyURL = fetchOptions.proxyAgent
  let proxy: AxiosRequestConfig['proxy'] = false
  if (proxyURL) {
    const url = new URL(proxyURL)
    proxy = {
      host: url.hostname,
      port: +url.port,
    }
  }

  const headers = options?.headers ?? {}
  if (fetchOptions?.cookie)
    headers.Cookie = fetchOptions.cookie

  return axios<T>({
    url: path,
    proxy,
    headers,
    ...options,
  }).then(res => res.data)
}
