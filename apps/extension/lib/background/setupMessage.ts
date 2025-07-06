import type { FetchConfig } from '@weibo-archiver/core'
import type { TaskConfig } from '@/types'
import { onMessage, sendMessage } from 'webext-bridge/background'
import { configService } from '@/lib/background/configService'
import {
  curTabId,
  fetchingTabId,
  fetchManager,
  handleGetAllWeiboData,
  taskScheduler,
} from '@/lib/background/index'
import {
  executeTask,
  getTaskStatus,
  updateTaskConfig,
} from '@/lib/background/runTask'
import { storageManager } from '@/lib/storageManager'

export function setupMessage() {
  // ==================== 用户和数据获取相关 ====================

  onMessage<{ uid: string }>('get-user-info', async ({ data }) => {
    return await fetchManager.fetchUser(data.uid)
  })

  onMessage<{ searchText: string }>('fetch:search-user', async ({ data }) => {
    return fetchManager.searchUser(data.searchText)
  })

  onMessage<{ uid: string }>('fetch:followings', async ({ data }) => {
    const { uid } = data || {}
    if (!uid) {
      return []
    }
    return fetchManager.fetchFollowings(uid)
  })

  onMessage<{
    uid: string
    newestPostDate: number
  }>('fetch:posts', async ({ data }) => {
    const { uid, newestPostDate } = data || {}

    if (!uid) {
      return []
    }
    fetchingTabId(curTabId())

    return fetchManager.fetchNewPosts({
      uid,
      newestPostDate,
      async onFetch(count) {
        await sendMessage('state:fetch-count', count, {
          tabId: curTabId(),
          context: 'window',
        })
      },
    })
  })

  // @ts-expect-error - 类型兼容性问题
  onMessage<FetchConfig & { uid: string }>(
    'fetch:all-posts',
    async ({ data }) => {
      Object.assign(fetchManager.config, data)
      fetchingTabId(curTabId())

      return fetchManager.fetchAllWeibo({
        uid: data.uid,
        async onFetch(data) {
          await sendMessage('fetch:all-posts-paged', data, {
            tabId: curTabId(),
            context: 'window',
          })
        },
      })
    },
  )

  onMessage<{ uid: string }>('fetch:favorites', async ({ data }) => {
    fetchManager.userService.uid = data.uid
    return fetchManager.fetchFavorites({
      onFetch: async posts =>
        sendMessage('fetch:favorites-paged', posts, {
          tabId: curTabId(),
          context: 'window',
        }),
    })
  })

  // ==================== 任务管理相关 ====================

  onMessage<{ taskId: string }>('start-backup', async ({ data }) => {
    await executeTask(data.taskId)
  })

  onMessage<{
    taskId: string
    config: Partial<TaskConfig>
  }>('update-task', async ({ data }) => {
    await updateTaskConfig(data.taskId, data.config)
  })

  // ==================== 状态和统计相关 ====================

  onMessage<{ taskId: string }>('get-task-status', async ({ data }) => {
    return await getTaskStatus(data.taskId)
  })

  onMessage('get-all-statuses', async () => {
    return await storageManager.getTaskStatuses()
  })

  onMessage('get-scheduler-stats', async () => {
    return taskScheduler.getStats()
  })

  // ==================== 配置相关 ====================

  onMessage<{ interval: number, autoStart: boolean }>(
    'set-global-config',
    async ({ data }) => {
      await configService.setGlobalConfig(
        data.interval,
        data.autoStart,
        taskScheduler,
      )
    },
  )

  onMessage('get-global-config', async () => {
    return await configService.getConfig()
  })

  onMessage('get-all-backup-data', async () => {
    return await handleGetAllWeiboData()
  })

  // ==================== 系统相关 ====================

  onMessage('ping', () => true)

  onMessage('get-system-info', async () => {
    return {
      version: '1.0.0',
      timestamp: Date.now(),
      isInitialized: true,
    }
  })

  console.log('Message handlers setup completed')
}
