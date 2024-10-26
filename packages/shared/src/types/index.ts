import type { Post, PostMeta } from './post'

export * from './config'
export * from './post'
export * from './protocol'

export type MethodObj<T> = {
  [K in keyof T]: (...args: any) => any
}

export interface IAccessor<Methods extends MethodObj<Methods>> {
  send: <T extends keyof Methods>(
    name: T,
    ...payload: Parameters<Methods[T]>
  ) => Promise<Awaited<ReturnType<Methods[T]>>>
}

export type FetchReturn = Promise<PostMeta | null>

export interface ParseResult {
  posts: Post[]
  imgs: Set<string>
}
