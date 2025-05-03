import type { FetchConfig, UserConfig } from '@weibo-archiver/core'

export const WEIBO_BASE_URL = 'https://weibo.com/ajax'

export const FETCH_PATH = {
  PROFILE: '/profile/info',
  PROFILE_DETAIL: '/profile/detail',
  FOLLOWINGS: '/friendships/friends',
  FOLLOWINGS_MINE: '/profile/followContent',

  SEARCH: '/side/search',

  POSTS_ALL: '/statuses/mymblog',
  POSTS_RANGE: '/statuses/searchProfile',
  POST_LONGTEXT: '/statuses/longtext',
  POST_COMMENTS: '/statuses/buildComments',
} as const

export const DEFAULT_FETCH_CONFIG: FetchConfig = {
  restore: false,
  curPage: 0,
  isFetchAll: true,
  repostPic: true,
  hasRepost: true,
  hasComment: true,
  commentCount: 5,
  followingsOnly: false,
  weiboOnly: false,
  sinceId: '',
  startAt: Date.now(),
  endAt: Date.now(),
}

export const DEFAULT_USER_CONFIG: UserConfig = {
  ...DEFAULT_FETCH_CONFIG,
  isMinimize: true,
  total: 0,
  fetchedCount: 0,
  theme: 'winter',
}
