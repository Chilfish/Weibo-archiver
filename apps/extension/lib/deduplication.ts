import type { Post } from '@weibo-archiver/core'
import type { BackupData } from '@/types'

/**
 * 数据去重和增量获取工具类
 */
export class DataDeduplicator {
  /**
   * 根据微博ID去重
   */
  static deduplicateByMblogId(posts: Post[]): Post[] {
    const uniquePosts = new Map<string, Post>()

    for (const post of posts) {
      if (!uniquePosts.has(post.mblogid)) {
        uniquePosts.set(post.mblogid, post)
      }
    }

    return Array.from(uniquePosts.values())
  }

  /**
   * 根据用户ID和微博ID组合去重
   */
  static deduplicateByUserAndPost(posts: Post[]): Post[] {
    const uniquePosts = new Map<string, Post>()

    for (const post of posts) {
      const key = `${post.userId}_${post.mblogid}`
      if (!uniquePosts.has(key)) {
        uniquePosts.set(key, post)
      }
    }

    return Array.from(uniquePosts.values())
  }

  /**
   * 过滤掉已存在的微博（基于本地数据）
   */
  static filterNewPosts(newPosts: Post[], existingPosts: Post[]): Post[] {
    const existingIds = new Set(existingPosts.map(p => p.mblogid))
    return newPosts.filter(post => !existingIds.has(post.mblogid))
  }

  /**
   * 获取本地最新微博的时间戳
   */
  static getLatestPostTime(backupData: BackupData | null): number {
    if (!backupData || !backupData.weibo || backupData.weibo.length === 0) {
      return 0
    }

    // 按创建时间排序，获取最新的微博时间
    const sortedPosts = backupData.weibo.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime()
      const timeB = new Date(b.createdAt).getTime()
      return timeB - timeA // 降序排列
    })

    return new Date(sortedPosts[0].createdAt).getTime()
  }

  /**
   * 过滤掉早于指定时间的微博
   */
  static filterPostsAfterTime(posts: Post[], afterTime: number): Post[] {
    return posts.filter((post) => {
      const postTime = new Date(post.createdAt).getTime()
      return postTime > afterTime
    })
  }

  /**
   * 检查获取的数据中是否包含旧数据
   * 返回 { hasOldData: boolean, oldDataCount: number }
   */
  static checkForOldData(
    posts: Post[],
    latestLocalTime: number,
  ): {
      hasOldData: boolean
      oldDataCount: number
      newDataCount: number
    } {
    let oldDataCount = 0
    let newDataCount = 0

    for (const post of posts) {
      const postTime = new Date(post.createdAt).getTime()
      if (postTime <= latestLocalTime) {
        oldDataCount++
      }
      else {
        newDataCount++
      }
    }

    return {
      hasOldData: oldDataCount > 0,
      oldDataCount,
      newDataCount,
    }
  }

  /**
   * 智能判断是否需要继续获取下一页
   *
   * @param posts 当前页的微博数据
   * @param latestLocalTime 本地最新微博时间
   * @param threshold 阈值，当旧数据占比超过此值时停止获取（0-1之间）
   * @returns 是否应该继续获取下一页
   */
  static shouldContinueFetching(
    posts: Post[],
    latestLocalTime: number,
    threshold = 0.8,
  ): {
      shouldContinue: boolean
      reason: string
      stats: {
        totalPosts: number
        newPosts: number
        oldPosts: number
        oldDataRatio: number
      }
    } {
    if (posts.length === 0) {
      return {
        shouldContinue: false,
        reason: '当前页无数据',
        stats: {
          totalPosts: 0,
          newPosts: 0,
          oldPosts: 0,
          oldDataRatio: 0,
        },
      }
    }

    const { oldDataCount, newDataCount } = DataDeduplicator.checkForOldData(
      posts,
      latestLocalTime,
    )
    const totalPosts = posts.length
    const oldDataRatio = oldDataCount / totalPosts

    const stats = {
      totalPosts,
      newPosts: newDataCount,
      oldPosts: oldDataCount,
      oldDataRatio,
    }

    // 如果没有新数据，停止获取
    if (newDataCount === 0) {
      return {
        shouldContinue: false,
        reason: '当前页全部为已存在数据',
        stats,
      }
    }

    // 如果旧数据占比超过阈值，停止获取
    if (oldDataRatio >= threshold) {
      return {
        shouldContinue: false,
        reason: `旧数据占比 ${(oldDataRatio * 100).toFixed(1)}% 超过阈值 ${(threshold * 100).toFixed(1)}%`,
        stats,
      }
    }

    // 继续获取
    return {
      shouldContinue: true,
      reason: `新数据占比 ${((1 - oldDataRatio) * 100).toFixed(1)}%，继续获取`,
      stats,
    }
  }

  /**
   * 合并新旧备份数据
   */
  static mergeBackupData(
    existingData: BackupData | null,
    newData: BackupData,
  ): BackupData {
    if (!existingData) {
      return newData
    }

    // 合并微博数据并去重
    const allPosts = [...existingData.weibo, ...newData.weibo]
    const uniquePosts = DataDeduplicator.deduplicateByMblogId(allPosts)

    // 按时间倒序排列
    uniquePosts.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime()
      const timeB = new Date(b.createdAt).getTime()
      return timeB - timeA
    })

    return {
      ...newData, // 使用新数据的用户信息等
      weibo: uniquePosts,
      lastUpdated: Date.now(),
    }
  }

  /**
   * 创建去重统计报告
   */
  static createDeduplicationReport(
    originalCount: number,
    deduplicatedCount: number,
    newPostsCount: number,
  ): {
      originalCount: number
      deduplicatedCount: number
      newPostsCount: number
      duplicatesRemoved: number
      deduplicationRate: number
    } {
    const duplicatesRemoved = originalCount - deduplicatedCount
    const deduplicationRate
      = originalCount > 0 ? duplicatesRemoved / originalCount : 0

    return {
      originalCount,
      deduplicatedCount,
      newPostsCount,
      duplicatesRemoved,
      deduplicationRate,
    }
  }

  /**
   * 获取时间范围内的数据获取策略
   */
  static getIncrementalFetchStrategy(
    lastBackupTime: number,
    currentTime: number = Date.now(),
  ): {
      strategy: 'full' | 'incremental' | 'recent'
      startTime: number
      endTime: number
      description: string
    } {
    const timeDiff = currentTime - lastBackupTime
    const oneDayMs = 24 * 60 * 60 * 1000
    const oneWeekMs = 7 * oneDayMs

    if (lastBackupTime === 0) {
      // 首次备份，只获取最近一天
      return {
        strategy: 'recent',
        startTime: currentTime - oneDayMs,
        endTime: currentTime,
        description: '首次备份，获取最近一天的微博',
      }
    }

    if (timeDiff <= oneDayMs) {
      // 一天内的增量备份
      return {
        strategy: 'incremental',
        startTime: lastBackupTime,
        endTime: currentTime,
        description: '增量备份，获取上次备份后的新微博',
      }
    }

    if (timeDiff <= oneWeekMs) {
      // 一周内的增量备份，稍微往前一点以防遗漏
      return {
        strategy: 'incremental',
        startTime: lastBackupTime - 60 * 60 * 1000, // 往前1小时
        endTime: currentTime,
        description: '增量备份，获取上次备份后的新微博（含1小时缓冲）',
      }
    }

    // 超过一周，采用全量策略
    return {
      strategy: 'full',
      startTime: new Date('2000-01-01').getTime(),
      endTime: currentTime,
      description: '间隔过长，采用全量备份策略',
    }
  }
}

/**
 * 分页获取控制器
 */
export class PaginationController {
  private consecutiveOldDataPages = 0
  private readonly maxConsecutiveOldPages = 3 // 连续遇到旧数据页面的最大次数

  /**
   * 重置计数器
   */
  reset(): void {
    this.consecutiveOldDataPages = 0
  }

  /**
   * 更新分页状态并判断是否继续
   */
  updateAndCheck(
    posts: Post[],
    latestLocalTime: number,
    threshold = 0.9,
  ): {
      shouldContinue: boolean
      reason: string
      consecutiveOldPages: number
    } {
    const { hasOldData, oldDataCount } = DataDeduplicator.checkForOldData(
      posts,
      latestLocalTime,
    )

    const oldDataRatio = posts.length > 0 ? oldDataCount / posts.length : 0

    // 如果当前页旧数据占比很高，增加计数器
    if (oldDataRatio >= threshold) {
      this.consecutiveOldDataPages++
    }
    else {
      this.consecutiveOldDataPages = 0 // 重置计数器
    }

    // 如果连续多页都是旧数据，停止获取
    if (this.consecutiveOldDataPages >= this.maxConsecutiveOldPages) {
      return {
        shouldContinue: false,
        reason: `连续 ${this.consecutiveOldDataPages} 页旧数据占比过高，停止获取`,
        consecutiveOldPages: this.consecutiveOldDataPages,
      }
    }

    // 如果当前页没有数据，停止获取
    if (posts.length === 0) {
      return {
        shouldContinue: false,
        reason: '当前页无数据，已到达末尾',
        consecutiveOldPages: this.consecutiveOldDataPages,
      }
    }

    return {
      shouldContinue: true,
      reason: `继续获取，连续旧数据页面: ${this.consecutiveOldDataPages}/${this.maxConsecutiveOldPages}`,
      consecutiveOldPages: this.consecutiveOldDataPages,
    }
  }
}
