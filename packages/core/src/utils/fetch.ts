import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { WEIBO_BASE_URL } from '../constants'
import { WeiboError } from './error'

export function createFetcher(args: CreateAxiosDefaults) {
  const _fetcher = axios.create({
    ...args,
    baseURL: WEIBO_BASE_URL,
  })

  return async function fetcher<
    T = any,
    R extends Record<string, any> = Record<string, any>,
  >(
    path: string,
    params?: R,
  ): Promise<{ data: T }> {
    return _fetcher(path, { params }).then(({ data: rawData, request }) => {
      const url = request.res?.responseUrl || path
      try {
        if (typeof rawData !== 'object') {
          throw new SyntaxError('Not a JSON')
        }

        const { ok, data, msg, ...restData } = rawData || {}
        if (ok !== 1) {
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
