import type { UserInfo } from '@/types'
import type { TaskConfig } from '@/types/storage'
import { useEffect } from 'react'
import { DEFAULT_TASK_CONFIG } from '@/lib/constants'
import { generateTaskId, messageManager } from '@/lib/messaging'
import { storageManager } from '@/lib/storage'
import { useConfigStore } from '@/lib/stores/useConfigStore'
import { useTaskStore } from '@/lib/stores/useTaskStore'

export const useAppInitialization = () => {
  const {
    setTasks,
    setTaskStatuses,
    setLoading,
    setError,
    clearError,
    addTask,
  } = useTaskStore()

  const { setConfig } = useConfigStore()

  useEffect(() => {
    initializeApp()
  }, [])

  async function initializeApp() {
    try {
      setLoading(true)
      clearError()

      // 先加载核心数据
      const [tasks, config, taskStatuses] = await Promise.all([
        storageManager.getTasks(),
        storageManager.getConfig(),
        storageManager.getTaskStatuses(),
      ])

      // 更新状态
      setTasks(tasks)
      setConfig(config)
      setTaskStatuses(taskStatuses)

      // 异步处理本地用户数据导入，不阻塞初始化
      setTimeout(async () => {
        try {
          const localUsers = await messageManager.getLocalUsers()
          if (localUsers.success && localUsers.users.length > 0) {
            await handleLocalUsersImport(localUsers.users, tasks)
          }
        }
        catch (error) {
          console.warn('Failed to import local users:', error)
          // 不影响主流程，只记录警告
        }
      }, 1000) // 延迟1秒执行，确保popup已完全加载

      setLoading(false)
    }
    catch (error) {
      console.error('Failed to initialize app:', error)
      setError(`初始化失败：${(error as Error).message}`)
      setLoading(false)
    }
  }

  async function handleLocalUsersImport(
    users: UserInfo[],
    existingTasks: TaskConfig[],
  ) {
    const existingUids = new Set(existingTasks.map(task => task.uid))

    for (const user of users) {
      if (existingUids.has(user.uid))
        continue

      const now = Date.now()
      const taskConfig: TaskConfig = {
        ...DEFAULT_TASK_CONFIG,
        id: generateTaskId(user.uid),
        uid: user.uid,
        username: user.name,
        avatar: user.avatar,
        url: '',
        addedAt: now,
        interval: 30,
        nextRunTime: now + 10 * 1000, // 10秒后开始首次备份
      }

      try {
        await storageManager.addTask(taskConfig)
        addTask(taskConfig)
      }
      catch (error) {
        console.error(`Failed to import user ${user.name}:`, error)
      }
    }
  }

  return {
    initializeApp,
  }
}
