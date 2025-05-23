import type { UserInfo } from '@weibo-archiver/core'

export interface FetchState {
  status: 'idle' | 'running' | 'finish'
  fetchType: 'weibo' | 'followings' | 'favorites'
}

export interface UserConfig {
  user?: UserInfo
  isMinimize: boolean
  restore: boolean
  isFetchAll: boolean
  largePic: boolean
  repostPic: boolean
  hasRepost: boolean
  hasComment: boolean
  commentCount: number

  hasFollowings: boolean
  hasFavorites: boolean
  hasWeibo: boolean

  startAt: number
  endAt: number
  curPage: number
  fetchedCount: number
  total: number
  theme: string
}

export type FetchOptions = Omit<UserConfig, 'isMinimize' | 'restore'>
