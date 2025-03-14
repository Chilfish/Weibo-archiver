import type { UserInfo } from '@shared'

export interface FetchState {
  isStart: boolean
  isStop: boolean
  isFinish: boolean
  isFetchingFollowings: boolean
}

export interface FetchProgress {
  percentage: number
  fetchedCount: number
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
  hasFavorite: boolean
  commentCount: number
  followingsOnly: boolean
  weiboOnly: boolean
  startAt: number
  endAt: number
  curPage: number
  fetchedCount: number
  total: number
  theme: string
}

export type FetchOptions = Omit<UserConfig, 'isMinimize' | 'restore'>
