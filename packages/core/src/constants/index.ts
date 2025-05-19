/**
 * 占位图
 */
import type { FetchConfig, UserConfig } from '@weibo-archiver/core'

export const imgViewSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/**
 * 默认的图片 CDN
 */
export const imgCdn = 'https://image.baidu.com/search/down?url='

export const localImgHost = 'http://localhost:3000/images'

export const proxyImgHost = 'https://proxy.chilfish.top/?url='

export const emojiUrl = 'https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal'

export const ImgPlaceholder = '/placeholder.webp'

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

  FAVORITES: '/favorites/all_fav',
} as const

export const DEFAULT_FETCH_CONFIG: FetchConfig = {
  restore: false,
  curPage: 0,
  isFetchAll: true,
  repostPic: true,
  hasRepost: true,
  hasComment: true,
  commentCount: 5,

  hasFollowings: true,
  hasFavorites: true,
  hasWeibo: true,

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

export const DEFAULT_PAGE_SIZE = 10
