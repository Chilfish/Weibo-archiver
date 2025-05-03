import * as z from 'zod'

export * from './fetchArgs'
export * from './raw'

export type UID = `uid-${number}`

const user = z.object({
  uid: z.string(),
  name: z.string(),
  avatar: z.string(),
  remark: z.string().optional(),
})

const userWithBio = user.extend({
  bio: z.string(),
})

const userInfo = userWithBio.extend({
  followers: z.number(),
  followings: z.number(),
  createdAt: z.string().optional(),
  birthday: z.string().optional(),
  postCount: z.number().optional(),
  exportedAt: z.string().optional(),
})

export type User = z.infer<typeof user>
export type UserBio = z.infer<typeof userWithBio>
export type UserInfo = z.infer<typeof userInfo>

export interface CardInfo {
  link: string
  title: string
  img: string
  desc?: string
}

export interface Meta {
  id: number
  region_name: string
  created_at: string | number
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
   * 转发的卡片（page_info, url_struct）
   */
  card?: CardInfo
  /**
   * 转发的微博
   */
  retweeted_status?: Retweet

  /**
   * 兼容旧版本的微博API
   */
  is_show_bulletin?: '0' | '2'

  comments: any[]
}

export type Retweet = Omit<Post, 'retweeted_status' | 'card' | 'user' | 'comments'> & {
  user?: User // 转发的微博可能被删除或是被夹
}

export type Comment = Pick<Post, 'text' | 'like_count' | 'comments_count'> & {
  img: string
  user: User
  floor_number: number
} & Meta

export interface FetchConfig {
  isFetchAll: boolean
  restore: boolean
  hasRepost: boolean
  hasComment: boolean
  repostPic: boolean
  commentCount: number
  followingsOnly: boolean
  weiboOnly: boolean
  sinceId: string
  startAt: number
  endAt: number
  curPage: number
}

export interface UserConfig extends FetchConfig {
  user?: UserInfo
  isMinimize: boolean
  fetchedCount: number
  total: number
  theme: string
}
