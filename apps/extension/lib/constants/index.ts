import type { AppConfig, FetchConfig, TaskConfig } from '@/types'

/**
 * 默认的图片 CDN
 */
export const imgCdn = 'https://image.baidu.com/search/down?url='

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
  curPage: 1,
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

// 默认配置
export const DEFAULT_APP_CONFIG: AppConfig = {
  saveDirectory: 'weibo_backup', // 导出文件名前缀
  globalInterval: 30, // 30分钟
  autoStart: false,
  maxRetries: 3,
  enableNotifications: true,
  theme: 'auto',
  enableFullBackup: false, // 默认首次只备份一天
}

export const DEFAULT_TASK_CONFIG: Omit<
  TaskConfig,
  'id' | 'uid' | 'username' | 'avatar' | 'url' | 'addedAt'
> = {
  enabled: true,
  interval: 30,
  lastCheck: 0,
  lastPostDate: 0,
  totalPosts: 0,
  isFirstBackup: true,
  nextRunTime: 0,
}

// 存储键名
export const STORAGE_KEYS = {
  TASKS: 'weibo_backup_tasks',
  CONFIG: 'weibo_backup_config',
  TASK_STATUSES: 'weibo_backup_task_statuses',
  BACKUP_META: 'weibo_backup_meta',
} as const
