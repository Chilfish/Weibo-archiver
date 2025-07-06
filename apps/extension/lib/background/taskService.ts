import type { Post } from '@weibo-archiver/core'
import type { TaskConfig, WeiboData } from '@/types'
import { DataDeduplicator, PaginationController } from '@/lib/deduplication'
import { storageManager } from '@/lib/storageManager'

export class TaskService {
  private static instance: TaskService

  private constructor() {}

  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService()
    }
    return TaskService.instance
  }

  async runTask(
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

    // 按时间倒序排列
    finalPosts.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime()
      const timeB = new Date(b.createdAt).getTime()
      return timeB - timeA
    })

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
    fetchManager: any,
    existingData: WeiboData | null,
    latestLocalTime: number,
  ): Promise<Post[]> {
    const allPosts: Post[] = []
    const paginationController = new PaginationController()
    let totalFetched = 0
    let newPostsCount = 0

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

        const deduplicatedPosts
          = DataDeduplicator.deduplicateByMblogId(newPosts)
        const duplicateCount = newPosts.length - deduplicatedPosts.length

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

export const backupService = TaskService.getInstance()
