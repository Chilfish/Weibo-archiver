export * from './protocol'

export interface User {
  id: string
  screen_name: string
  profile_image_url: string
}

export interface PicInfo {
  largest: {
    url: string
  }
}

export interface CardInfo {
  link: string
  title: string
  img: string
  desc?: string
}

export interface Meta {
  id: number
  region_name: string
  created_at: string
  detail_url?: string
  source?: string
}

export interface Post extends Meta {
  mblogid: string
  text: string
  imgs: string[]

  reposts_count: number
  comments_count: number
  like_count: number

  /**
   * 发布者，但被删或者被夹了的话就没有
   */
  user?: User
  /**
   * 转发的卡片（page_info, url_struct）
   */
  card?: CardInfo
  /**
   * 转发的微博
   */
  retweeted_status?: Omit<Post, 'retweeted_status' | 'card'>

  comments: Comment[]
}

export type Comment = Pick<Post, 'user' | 'text' | 'like_count' | 'comments_count' > & {
  img: string
} & Meta

export interface PostMeta {
  total: number
  since_id: string
  page: number
  list: Post[]
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
