import type { Post } from '@weibo-archiver/core'
import type { BackgroundWindowRouter } from '@/lib/window/message'
import type { TaskConfig, WeiboData } from '@/types'
import { createTipcClient } from '@weibo-archiver/core'
import { sendMessage as background_sendMessage } from 'webext-bridge/background'
import { browser } from 'wxt/browser'
import { DEFAULT_FETCH_CONFIG } from '@/lib/constants'
import { DataDeduplicator } from '@/lib/deduplication'
import { FetchManager } from '@/lib/fetchManager'
import { storageManager } from '@/lib/storageManager'

export const fetchManager = new FetchManager(DEFAULT_FETCH_CONFIG)

async function getTabId(): Promise<number> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return tabs[0]?.id || 0
}

export const backgroundWindowClient = createTipcClient<BackgroundWindowRouter>({
  async sender(key, message) {
    const tabId = await getTabId()
    if (!tabId) {
      throw new Error('No active tab found to send message.')
    }
    return background_sendMessage(key, message, `content-script@${tabId}`)
  },
})

export class BackupService {
  private static instance: BackupService

  private constructor() {}

  static getInstance(): BackupService {
    if (!BackupService.instance) {
      BackupService.instance = new BackupService()
    }
    return BackupService.instance
  }

  async runBackup(
    task: TaskConfig,
  ): Promise<WeiboData> {
    console.log(`Starting backup for task ${task.id}:`, {
      username: task.username,
      isFirstBackup: task.isFirstBackup,
    })

    // 获取用户信息
    const userInfo = await fetchManager.fetchUser(task.uid)

    // 获取现有备份数据以进行去重和增量获取
    const existingData = await storageManager.getBackupData(task.id)
    const latestLocalTime = DataDeduplicator.getLatestPostTime(existingData)

    console.log(`Task ${task.id} backup info:`, {
      username: task.username,
      isFirstBackup: task.isFirstBackup,
      existingPostsCount: existingData?.weibo?.length || 0,
      latestLocalTime:
        latestLocalTime > 0 ? new Date(latestLocalTime).toISOString() : 'none',
    })

    // 配置获取管理器
    fetchManager.config = {
      ...fetchManager.config,
      isFetchAll: false,
      startAt: latestLocalTime,
      endAt: Date.now(),
    }

    await storageManager.updateTaskStatus(task.id, {
      status: 'running',
      message: '',
      progress: 10,
    })

    // 获取微博数据
    const allPosts = await this.fetchWeiboData(task)

    await storageManager.updateTaskStatus(task.id, {
      status: 'running',
      message: `数据处理完成，获得 ${allPosts.length} 条微博`,
      progress: 80,
    })

    return {
      user: userInfo,
      weibo: allPosts,
      followings: [],
      favorites: [],
      lastUpdated: Date.now(),
      version: '1.0.0',
    }
  }

  private async fetchWeiboData(
    task: TaskConfig,
  ): Promise<Post[]> {
    const allPosts: Post[] = []
    let totalFetched = 0
    let newPostsCount = 0

    const newestPost = await backgroundWindowClient.getNewestPost({ uid: task.uid })
    console.log(newestPost)
    let startAtDate = new Date()
    if (newestPost?.createdAt) {
      startAtDate = new Date(newestPost.createdAt)
    }

    fetchManager.config.startAt = startAtDate.getTime()

    await fetchManager.fetchAllWeibo({
      uid: task.uid,
      onFetch: async ({
        posts: newPosts,
        page,
      }: {
        posts: Post[]
        page: number
      }) => {
        console.log(`Task ${task.id} fetched page ${page}:`, {
          postsCount: newPosts.length,
          totalFetched: totalFetched + newPosts.length,
        })

        allPosts.push(...newPosts)
        totalFetched += newPosts.length
        newPostsCount += newPosts.length

        // 更新进度
        const progress = Math.min(10 + (totalFetched / 100) * 60, 70) // 微博获取占60%进度
        const message = `已获取 ${totalFetched} 条微博，新增 ${newPostsCount} 条...`

        await storageManager.updateTaskStatus(task.id, {
          status: 'running',
          message,
          progress,
        })
      },
    })

    return allPosts
  }
}

export const backupService = BackupService.getInstance()
