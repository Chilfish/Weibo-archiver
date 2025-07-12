import type { FetchConfig } from '@weibo-archiver/core'
import type { AppConfig, SchedulerConfig, TaskConfig } from '@/types'

/**
 * 默认的图片 CDN
 */
export const imgCdn = 'https://image.baidu.com/search/down?url='

export const WEIBO_BASE_URL = 'https://weibo.com/ajax'

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
  maxRetries: 3,
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

export const DEFAULT_SCHEDULER_CONFIG: SchedulerConfig = {
  checkInterval: 60 * 1000, // 每分钟检查一次
  maxConcurrentTasks: 3, // 最多同时运行3个任务
  retryDelay: 30 * 60 * 1000, // 失败后30分钟重试
  logLevel: 'info',
}
