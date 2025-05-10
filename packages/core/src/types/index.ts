import type { Post } from './post'
import type { UserBio, UserInfo } from './user'

export * from './fetchArgs'
export * from './post'
export * from './raw'
export * from './user'

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

export interface Album {
  url: string
  id: string
  date: string
}

export interface ImportedData {
  weibo: Post[]
  user: UserInfo
  followings: UserBio[]
}
