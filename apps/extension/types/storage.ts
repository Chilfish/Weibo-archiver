import type { Favorite, Following, Post, UserInfo } from '@weibo-archiver/core'

export interface TaskConfig {
  id: string
  uid: string
  username: string
  avatar?: string
  url: string
  enabled: boolean
  interval: number // 检查间隔（分钟）
  lastCheck: number // 最后检查时间戳
  lastPostDate: number // 最新微博时间戳
  totalPosts: number // 累计微博数量
  addedAt: number // 添加时间戳
  isFirstBackup: boolean // 是否首次备份
  nextRunTime: number // 下次运行时间戳
}

export interface AppConfig {
  saveDirectory: string // 导出文件名前缀
  globalInterval: number // 全局检查间隔（分钟）
  autoStart: boolean // 是否自动开始检查
  maxRetries: number // 最大重试次数
  enableNotifications: boolean // 是否启用通知
  theme: 'light' | 'dark' | 'auto'
  enableFullBackup: boolean // 是否启用首次全量备份
}

export interface TaskStatus {
  id: string
  status: 'idle' | 'running' | 'error' | 'success'
  message: string
  progress: number // 0-100
  lastRun: number
  nextRun: number
}

export interface WeiboData {
  user: UserInfo
  weibo: Post[]
  followings: Following[]
  favorites: Favorite[]
  lastUpdated: number
  version: string
}

export interface StorageData {
  tasks: TaskConfig[]
  config: AppConfig
  taskStatuses: Record<string, TaskStatus>
  backupMeta: Record<
    string,
    {
      lastBackup: number
      totalPosts: number
      filePath: string
    }
  >
}
