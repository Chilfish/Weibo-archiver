import type { Ref } from 'vue'
import type { Post, PostMeta } from './post'

export * from './protocol'
export * from './config'
export * from './IPC'
export * from './post'

export type MethodObj<T> = {
  [K in keyof T]: (...args: any) => any
}

export interface IAccessor<Methods extends MethodObj<Methods>> {
  send: <T extends keyof Methods>(
    name: T,
    ...payload: Parameters<Methods[T]>
  ) => Promise<Awaited<ReturnType<Methods[T]>>>
}

/**
 * 循环获取数据函数的参数
 */
export interface LoopFetchParams {
  /**
   * 从第几页开始
   */
  start: number
  /**
   * 停止条件，应该为 fetchedPosts >= total
   */
  stopFn: () => boolean
  /**
   * 每次获取到数据后的回调
   */
  onResult: (list: Post[]) => void
  /**
   * 用哪个函数来获取数据，用 `page => fetchFn(page)` 来包裹
   */
  fetchFn?: (page: number) => FetchReturn
  /**
   * 获取完所有数据后的回调
   */
  onEnd?: () => Promise<void>
  /**
   * 中止获取数据，但还是会等到当前页获取完之后才会中止
   */
  isAbort?: Ref<boolean>
}

export type FetchReturn = Promise<PostMeta & {
  abort: () => void
} | null>

export interface ParseResult {
  posts: Post[]
  imgs: Set<string>
}
