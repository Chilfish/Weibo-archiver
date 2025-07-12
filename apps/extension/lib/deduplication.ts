import type { Post } from '@weibo-archiver/core'
import type { WeiboData } from '@/types'

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
   * 过滤掉已存在的微博（基于本地数据）
   */
  static filterNewPosts(newPosts: Post[], existingPosts: Post[]): Post[] {
    const existingIds = new Set(existingPosts.map(p => p.mblogid))
    return newPosts.filter(post => !existingIds.has(post.mblogid))
  }

  /**
   * 获取本地最新微博的时间戳
   */
  static getLatestPostTime(backupData: WeiboData | null): number {
    if (!backupData || backupData?.weibo.length === 0) {
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
   * 合并新旧备份数据
   */
  static mergeBackupData(
    existingData: WeiboData | null,
    newData: WeiboData,
  ): WeiboData {
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
}
