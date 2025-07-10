import type { Post } from '@weibo-archiver/core'
import type { FetchManager } from '@/lib/fetchManager'
import type { BackgroundWindowRouter } from '@/lib/window/message'
import type { TaskConfig, WeiboData } from '@/types'
import { createTipcClient } from '@weibo-archiver/core'
import {
  sendMessage as background_sendMessage,
} from 'webext-bridge/background'
import { browser } from 'wxt/browser'
import { DataDeduplicator, PaginationController } from '@/lib/deduplication'
import { storageManager } from '@/lib/storageManager'
// import { getTabId } from '@/lib/utils'
async function getTabId() {
  // @see https://serversideup.net/open-source/webext-bridge/docs/api/notes
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })

  return tabs[0].id || 0
}

export const backgroundWindowClient = createTipcClient<BackgroundWindowRouter>({
  async sender(key, message) {
    const tabId = await getTabId()
    const dest = `window@${tabId}`
    return background_sendMessage(key, message, dest)
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
    fetchManager: any,
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

    // 获取数据获取策略
    const strategy = DataDeduplicator.getIncrementalFetchStrategy(
      task.isFirstBackup ? 0 : latestLocalTime,
      Date.now(),
    )

    console.log(`Using fetch strategy for task ${task.id}:`, strategy)

    // 配置获取管理器
    fetchManager.config = {
      ...fetchManager.config,
      isFetchAll: strategy.strategy === 'full',
      startAt: strategy.startTime,
      endAt: strategy.endTime,
    }

    await storageManager.updateTaskStatus(task.id, {
      status: 'running',
      message: strategy.description,
      progress: 10,
    })

    // 获取微博数据
    const allPosts = await this.fetchWeiboData(
      task,
      fetchManager,
      existingData,
      latestLocalTime,
    )

    // 最终去重处理
    const finalPosts = DataDeduplicator.deduplicateByMblogId(allPosts)

    await storageManager.updateTaskStatus(task.id, {
      status: 'running',
      message: `数据处理完成，去重后获得 ${finalPosts.length} 条微博`,
      progress: 80,
    })

    const backupData: WeiboData = {
      user: userInfo,
      weibo: finalPosts,
      followings: [],
      favorites: [],
      lastUpdated: Date.now(),
      version: '1.0.0',
    }

    // 如果有现有数据，进行合并
    if (existingData && existingData.weibo.length > 0) {
      console.log(`Task ${task.id} merging with existing data:`, {
        existingPosts: existingData.weibo.length,
        newPosts: finalPosts.length,
      })

      const mergedData = DataDeduplicator.mergeBackupData(
        existingData,
        backupData,
      )

      console.log(`Task ${task.id} merge result:`, {
        totalPosts: mergedData.weibo.length,
      })

      return mergedData
    }

    return backupData
  }

  private async fetchWeiboData(
    task: TaskConfig,
    fetchManager: FetchManager,
    existingData: WeiboData | null,
    latestLocalTime: number,
  ): Promise<Post[]> {
    const allPosts: Post[] = []
    const paginationController = new PaginationController()
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

        const deduplicatedPosts = DataDeduplicator.deduplicateByMblogId(newPosts)

        // 过滤掉已存在的微博（如果有本地数据）
        let filteredPosts = deduplicatedPosts
        if (existingData && existingData.weibo.length > 0) {
          filteredPosts = DataDeduplicator.filterNewPosts(
            deduplicatedPosts,
            existingData.weibo,
          )

          // 智能判断是否需要继续获取
          const shouldContinue = DataDeduplicator.shouldContinueFetching(
            deduplicatedPosts,
            latestLocalTime,
            0.7, // 当70%都是旧数据时停止
          )

          console.log(`Task ${task.id} page ${page} analysis:`, shouldContinue)

          // 检查分页控制器
          const paginationCheck = paginationController.updateAndCheck(
            deduplicatedPosts,
            latestLocalTime,
            0.8,
          )

          console.log(`Task ${task.id} pagination check:`, paginationCheck)

          // 如果需要停止获取，记录日志（fetchAllWeibo会自动处理停止逻辑）
          if (
            !shouldContinue.shouldContinue
            || !paginationCheck.shouldContinue
          ) {
            console.log(`Task ${task.id} stopping fetch:`, {
              shouldContinueReason: shouldContinue.reason,
              paginationReason: paginationCheck.reason,
            })
          }
        }

        allPosts.push(...filteredPosts)
        totalFetched += newPosts.length
        newPostsCount += filteredPosts.length

        // 更新进度
        const progress = Math.min(10 + (totalFetched / 100) * 60, 70) // 微博获取占60%进度
        const message = task.isFirstBackup
          ? `首次备份已获取 ${totalFetched} 条微博，新增 ${newPostsCount} 条...`
          : `增量备份已获取 ${totalFetched} 条微博，新增 ${newPostsCount} 条...`

        await storageManager.updateTaskStatus(task.id, {
          status: 'running',
          message,
          progress,
        })
      },
    })

    // 创建去重报告
    const deduplicationReport = DataDeduplicator.createDeduplicationReport(
      totalFetched,
      allPosts.length,
      newPostsCount,
    )

    console.log(`Task ${task.id} deduplication report:`, deduplicationReport)

    return allPosts
  }
}

export const backupService = BackupService.getInstance()
