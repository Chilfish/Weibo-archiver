import type { UserInfo } from '@weibo-archiver/core'
import type { WeiboData } from '@/types'
import { contentBackgroundClient } from '@/lib/utils'

/**
 * 向当前页面发送数据
 */
export async function sendDataToWeb(): Promise<{
  success: boolean
  error?: string
  message?: string
}> {
  try {
    const response = await contentBackgroundClient.getAllBackupData()

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
      const data = backupData as WeiboData
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

export function getLocalUsers(): UserInfo[] {
  const usersData = localStorage.getItem('users')
  if (!usersData) {
    console.log('localStorage 中未找到 users 数据')
    return []
  }
  return JSON.parse(usersData)
}
