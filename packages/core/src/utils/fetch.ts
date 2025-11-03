import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { WEIBO_BASE_URL } from '../constants'
import { WeiboError } from './error'

export function createFetcher(args: CreateAxiosDefaults & {
  beforeFetch?: (path: string) => any
  on403Error?: (path: string) => any
}) {
  const _fetcher = axios.create({
    ...args,
    headers: {
      ...args.headers,
      'referer': 'https://weibo.com/',
      'host': 'weibo.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    baseURL: WEIBO_BASE_URL,
  })

  _fetcher.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response?.status === 403) {
        await args.on403Error?.(error.config.url || '')
      }
      return Promise.reject(error)
    },
  )

  return async function fetcher<
    T = any,
    R extends Record<string, any> = Record<string, any>,
  >(
    path: string,
    params?: R,
  ): Promise<{ data: T }> {
    await args.beforeFetch?.(path)

    return _fetcher(path, { params }).then(async ({ data: rawData, request, status }) => {
      const url = request.res?.responseUrl || path
      try {
        if (typeof rawData !== 'object') {
          throw new SyntaxError('Not a JSON')
        }

        const { ok, data, msg, ...restData } = rawData || {}
        if (ok === -100 || status === 403) {
          await args.on403Error?.(path)
          throw new WeiboError('登录状态已过期，请先登录微博网页版')
        }
        else if (ok !== 1) {
          throw new WeiboError(`成功码不为 1: ${msg}`)
        }
        if (!data && restData) {
          return {
            data: restData,
          }
        }
        return rawData
      }
      catch (err: any) {
        if (err.name === `SyntaxError`) {
          throw new WeiboError(`未获取到 JSON，Cookie 可能已过期 [${url}]`)
        }
        throw new WeiboError(`${err.message} [${url}]`)
      }
    })
  }
}

export type Fetcher = ReturnType<typeof createFetcher>
