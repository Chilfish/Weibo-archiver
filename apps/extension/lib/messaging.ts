import type { UserInfo } from '@weibo-archiver/core'
import type { TaskConfig, TaskStatus } from '@/types/storage'
import { sendMessage } from 'webext-bridge/popup'
import { browser } from 'wxt/browser'

type RuntimeContext =
  | 'devtools'
  | 'background'
  | 'popup'
  | 'options'
  | 'content-script'
  | 'window'

// 消息类型定义
export interface MessageTypes {
  // 获取用户信息
  'get-user-info': {
    data: { uid: string }
    return: UserInfo
  }

  // 开始备份任务
  'start-backup': {
    data: { taskId: string }
    return: undefined
  }

  // 获取任务状态
  'get-task-status': {
    data: { taskId: string }
    return: TaskStatus
  }

  // 更新任务配置
  'update-task': {
    data: { taskId: string, config: Partial<TaskConfig> }
    return: undefined
  }

  // 获取所有任务状态
  'get-all-statuses': {
    data: object
    return: Record<string, TaskStatus>
  }

  // 设置全局配置
  'set-global-config': {
    data: { interval: number, autoStart: boolean }
    return: undefined
  }

  // 获取本地存储的用户数据
  'get-local-users': {
    data: object
    return: {
      success: boolean
      users: UserInfo[]
      error?: string
    }
  }

  // 将数据发送到web端
  'send-data-to-web': {
    data: object
    return: {
      success: boolean
      error?: string
      message?: string
    }
  }
}

// 消息管理器类
class MessageManager {
  private static instance: MessageManager

  private constructor() {}

  static getInstance(): MessageManager {
    if (!MessageManager.instance) {
      MessageManager.instance = new MessageManager()
    }
    return MessageManager.instance
  }

  // 发送消息的通用方法
  async send<T extends keyof MessageTypes>(
    type: T,
    data: MessageTypes[T]['data'],
    dest: RuntimeContext = 'background',
  ): Promise<MessageTypes[T]['return']> {
    try {
      let _dest = dest as string
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      })
      if (_dest === 'content-script') {
        // @see https://serversideup.net/open-source/webext-bridge/docs/guide/examples#popup-content-script
        _dest = `content-script@${tabs[0].id}`
      }
      else if (_dest === 'window') {
        (_dest as any) = {
          context: 'window',
          tabId: tabs[0].id,
        }
      }

      const response = await sendMessage(type, data as any, _dest)
      return response as MessageTypes[T]['return']
    }
    catch (error) {
      console.error(`Failed to send message ${type}:`, error)
      throw error
    }
  }

  // 获取用户信息
  async getUserInfo(uid: string): Promise<UserInfo> {
    return this.send('get-user-info', { uid })
  }

  // 开始备份任务
  async startBackup(taskId: string): Promise<void> {
    return this.send('start-backup', { taskId })
  }

  // 获取任务状态
  async getTaskStatus(taskId: string): Promise<TaskStatus> {
    return this.send('get-task-status', { taskId })
  }

  // 更新任务配置
  async updateTask(taskId: string, config: Partial<TaskConfig>): Promise<void> {
    return this.send('update-task', { taskId, config })
  }

  // 获取所有任务状态
  async getAllStatuses(): Promise<Record<string, TaskStatus>> {
    return this.send('get-all-statuses', {})
  }

  // 设置全局配置
  async setGlobalConfig(interval: number, autoStart: boolean): Promise<void> {
    return this.send('set-global-config', { interval, autoStart })
  }

  // 获取本地存储的用户数据
  async getLocalUsers(): Promise<{
    success: boolean
    users: UserInfo[]
    error?: string
  }> {
    try {
      // 先检查content script是否可用
      const isAvailable = await isContentScriptAvailable()
      if (!isAvailable) {
        console.log(
          'Content script not available, skipping local users import',
        )
        return {
          success: true,
          users: [],
          error: undefined,
        }
      }

      // 设置超时机制，避免在生产环境中无限等待
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error('获取本地用户数据超时'))
        }, 3000) // 3秒超时
      })

      const response = await Promise.race([
        this.send('get-local-users', {}, 'content-script'),
        timeoutPromise,
      ])

      return response as {
        success: boolean
        users: UserInfo[]
        error?: string
      }
    }
    catch (error) {
      console.error('Failed to get local users:', error)

      // 如果是超时或连接错误，返回空结果而不是错误
      const errorMessage = (error as Error).message
      if (
        errorMessage.includes('超时')
        || errorMessage.includes('timeout')
        || errorMessage.includes('bridge')
        || errorMessage.includes('Could not establish connection')
      ) {
        console.log(
          'Content script not available, skipping local users import',
        )
        return {
          success: true,
          users: [],
          error: undefined,
        }
      }

      return {
        success: false,
        users: [],
        error: errorMessage,
      }
    }
  }
}

export const messageManager = MessageManager.getInstance()

// 工具函数：解析微博用户 URL
export function parseWeiboUrl(
  url: string,
): { uid: string, username?: string } | null {
  try {
    const urlObj = new URL(url)

    // 支持的 URL 格式：
    // https://weibo.com/u/1234567890
    // https://weibo.com/username
    // https://m.weibo.cn/u/1234567890
    // https://m.weibo.cn/profile/1234567890

    const pathSegments = urlObj.pathname.split('/').filter(Boolean)

    if (pathSegments.length === 0) {
      return null
    }

    // 处理 /u/uid 格式
    if (pathSegments[0] === 'u' && pathSegments[1]) {
      const uid = pathSegments[1]
      if (/^\d+$/.test(uid)) {
        return { uid }
      }
    }

    // 处理 /profile/uid 格式 (移动端)
    if (pathSegments[0] === 'profile' && pathSegments[1]) {
      const uid = pathSegments[1]
      if (/^\d+$/.test(uid)) {
        return { uid }
      }
    }

    // 处理直接用户名格式 /username
    if (
      pathSegments[0]
      && pathSegments[0] !== 'u'
      && pathSegments[0] !== 'profile'
    ) {
      return { uid: '', username: pathSegments[0] }
    }

    return null
  }
  catch (error) {
    console.error('Failed to parse Weibo URL:', error)
    return null
  }
}

// 格式化时间间隔
export function formatInterval(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} 分钟`
  }
  if (minutes < 1440) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0
      ? `${hours} 小时 ${remainingMinutes} 分钟`
      : `${hours} 小时`
  }
  const days = Math.floor(minutes / 1440)
  const remainingHours = Math.floor((minutes % 1440) / 60)
  return remainingHours > 0
    ? `${days} 天 ${remainingHours} 小时`
    : `${days} 天`
}

// 检查content script是否可用
export async function isContentScriptAvailable(): Promise<boolean> {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    })

    const activeTab = tabs[0]
    if (!activeTab?.url)
      return false

    // 检查是否在支持的网站上
    const url = new URL(activeTab.url)
    return (
      url.hostname.includes('localhost')
      || url.hostname.includes('weibo-archiver.chilfish.top')
      || url.hostname.includes('weibo.com')
    )
  }
  catch (error) {
    console.warn('Failed to check content script availability:', error)
    return false
  }
}

// 生成任务 ID（使用用户UID）
export function generateTaskId(uid: string): string {
  return uid
}
