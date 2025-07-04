import { useCallback, useEffect } from 'react'
import { messageManager } from '@/lib/messaging'
import { useTaskStore } from '@/lib/stores/useTaskStore'

export const useTaskStatusUpdater = () => {
  const { tasks, setTaskStatuses, updateTaskStatus, setError } = useTaskStore()

  const updateTaskStatuses = useCallback(async () => {
    try {
      const statuses = await messageManager.getAllStatuses()
      setTaskStatuses(statuses)
    }
    catch (error) {
      console.error('Failed to update task statuses:', error)
      setError(`更新任务状态失败：${(error as Error).message}`)
    }
  }, [setTaskStatuses, setError])

  const updateSingleTaskStatus = useCallback(
    async (taskId: string) => {
      try {
        const status = await messageManager.getTaskStatus(taskId)
        if (status) {
          updateTaskStatus(taskId, status)
        }
      }
      catch (error) {
        console.error(`Failed to update status for task ${taskId}:`, error)
      }
    },
    [updateTaskStatus],
  )

  const forceUpdateAllStatuses = useCallback(async () => {
    await updateTaskStatuses()
  }, [updateTaskStatuses])

  // 定期更新任务状态
  useEffect(() => {
    if (tasks.length === 0)
      return

    const interval = setInterval(updateTaskStatuses, 5000) // 每5秒更新一次状态
    return () => clearInterval(interval)
  }, [tasks.length])

  return {
    updateTaskStatuses,
    updateSingleTaskStatus,
    forceUpdateAllStatuses,
  }
}
