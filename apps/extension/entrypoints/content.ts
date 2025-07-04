import type { UserInfo } from '@/types'
import type { BackupData } from '@/types/storage'
import {
  allowWindowMessaging,
  onMessage,
  sendMessage,
} from 'webext-bridge/content-script'
import { defineContentScript } from 'wxt/utils/define-content-script'

export default defineContentScript({
  matches: [
    '*://localhost/*',
    'https://weibo.com/*',
    'https://weibo-archiver.chilfish.top/*',
  ],
  async main() {
    const isNotInWeb = !document.URL.includes('weibo-archiver.chilfish.top')

    // if (isNotInWeb) {
    //   return;
    // }
    console.log('微博自动备份 Content Script 已加载')

    allowWindowMessaging(window.origin)

    // 监听来自 background script 的数据同步消息
    onMessage<any>('sync-backup-data', async ({ data }) => {
      try {
        console.log('收到备份数据同步请求:', data)
        await importDataToTargetSite(data.backupData)
        return { success: true }
      }
      catch (error) {
        console.error('同步备份数据失败:', error)
        return { success: false, error: (error as Error).message }
      }
    })

    // 监听获取本地存储用户数据的消息
    onMessage<any>('get-local-users', async () => {
      if (isNotInWeb) {
        return {
          success: true,
          users: [],
        }
      }

      try {
        const users = getLocalStorageUsers()
        return { success: true, users }
      }
      catch (error) {
        console.error('获取本地用户数据失败:', error)
        return { success: false, error: (error as Error).message, users: [] }
      }
    })

    // 监听发送数据到web端的消息
    onMessage<any>('send-data-to-web', async () => {
      try {
        console.log('收到发送数据到web端的请求')

        // 检查当前页面是否支持数据导入
        const isTargetSite
          = window.location.hostname.includes('localhost')
            || window.location.hostname.includes('weibo-archiver.chilfish.top')

        if (!isTargetSite) {
          // 不在目标网站，返回提示信息
          return {
            success: false,
            error:
              '请先打开 weibo-archiver.chilfish.top 网站，然后再点击发送数据按钮',
          }
        }

        // 在目标网站，直接发送数据
        return await sendDataToCurrentPage()
      }
      catch (error) {
        console.error('发送数据到web端失败:', error)
        return { success: false, error: (error as Error).message }
      }
    })
  },
})

/**
 * 向当前页面发送数据
 */
async function sendDataToCurrentPage(): Promise<{
  success: boolean
  error?: string
  message?: string
}> {
  try {
    // 向 background script 请求最新的备份数据
    const response = await sendMessage('get-all-backup-data', {}, 'background')

    if (!response) {
      return { success: false, error: '获取备份数据失败' }
    }

    const backupDataMap = response
    const userCount = Object.keys(backupDataMap).length

    if (userCount === 0) {
      return {
        success: false,
        error: '没有可发送的备份数据，请先添加备份任务并等待数据备份完成',
      }
    }

    console.log(`准备发送 ${userCount} 个用户的数据到当前页面...`)

    // 批量导入所有用户的数据
    const importData: Record<string, any> = {}
    let totalPosts = 0

    for (const [userId, backupData] of Object.entries(backupDataMap)) {
      const data = backupData as BackupData
      importData[userId] = {
        weibo: data.weibo,
        user: data.user,
        followings: data.followings || [],
        favorites: data.favorites || [],
        lastUpdated: data.lastUpdated,
        version: data.version,
      }
      totalPosts += data.weibo.length
    }

    // 触发导入事件
    window.dispatchEvent(
      new CustomEvent('importFromExt', {
        detail: importData,
      }),
    )

    return {
      success: true,
      message: `成功发送 ${userCount} 个用户的数据，共 ${totalPosts} 条微博`,
    }
  }
  catch (error) {
    console.error('发送数据到当前页面失败:', error)
    return { success: false, error: (error as Error).message }
  }
}

/**
 * 通过 CustomEvent 向目标网站导入数据
 */
async function importDataToTargetSite(backupData: BackupData): Promise<void> {
  try {
    // 构造目标网站期望的数据格式
    const importData = {
      [backupData.user.uid]: {
        weibo: backupData.weibo,
        user: backupData.user,
        followings: backupData.followings || [],
        favorites: backupData.favorites || [],
        lastUpdated: backupData.lastUpdated,
        version: backupData.version,
      },
    }

    // 触发自定义事件
    window.dispatchEvent(
      new CustomEvent('importFromExt', {
        detail: importData,
      }),
    )

    console.log(
      `成功向目标网站导入用户 ${backupData.user.name} 的数据，共 ${backupData.weibo.length} 条微博`,
    )
  }
  catch (error) {
    console.error('导入数据到目标网站失败:', error)
    throw error
  }
}

/**
 * 从 localStorage 读取用户数据
 */
function getLocalStorageUsers(): UserInfo[] {
  try {
    const usersData = localStorage.getItem('users')
    if (!usersData) {
      console.log('localStorage 中未找到 users 数据')
      return []
    }

    const users = JSON.parse(usersData)
    if (!Array.isArray(users)) {
      console.warn('localStorage 中的 users 数据格式不正确，应为数组')
      return []
    }

    return users.filter((user): user is UserInfo => {
      // 基本验证用户数据格式
      return (
        user
        && typeof user === 'object'
        && typeof user.uid === 'string'
        && typeof user.name === 'string'
        && user.uid.length > 0
        && user.name.length > 0
      )
    })
  }
  catch (error) {
    console.error('解析 localStorage users 数据失败:', error)
    return []
  }
}
