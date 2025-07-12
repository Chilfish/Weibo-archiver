export * from './storage'

export interface SchedulerConfig {
  checkInterval: number // 检查间隔（毫秒）
  maxConcurrentTasks: number // 最大并发任务数
  retryDelay: number // 重试延迟（毫秒）
  logLevel: 'debug' | 'info' | 'warn' | 'error'
}

export interface SchedulerStats {
  totalTasks: number
  enabledTasks: number
  runningTasks: number
  completedTasks: number
  failedTasks: number
  nextRunTime: number | null
  lastCheckTime: number
}
