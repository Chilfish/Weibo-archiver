export interface FetchState {
  isStart: boolean
  isStop: boolean
  isFinish: boolean
  isFetchingFollowings: boolean
}

export interface FetchProgress {
  percentage: number
  fetchedCount: number
  total: number
}

export interface UserConfig {
  uid: string
  name: string
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
}

export type FetchOptions = Omit<UserConfig, 'isMinimize' | 'restore'>
