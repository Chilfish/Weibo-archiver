import type { TaskConfig } from '@/types/storage'
import { useCallback } from 'react'
import { messageManager } from '@/lib/messaging'
import { storageManager } from '@/lib/storageManager'
import { useTaskStore } from '@/lib/stores/useTaskStore'
import { useUIStore } from '@/lib/stores/useUIStore'

export const useTaskOperations = () => {
  const { addTask, updateTask, removeTask, setError, clearError }
    = useTaskStore()

  const { setShowAddTaskDialog } = useUIStore()

  const handleAddTask = useCallback(
    async (taskConfig: TaskConfig) => {
      try {
        clearError()
        await storageManager.addTask(taskConfig)
        addTask(taskConfig)
        setShowAddTaskDialog(false)

        // 添加任务后立即开始备份
        console.log(`Starting backup for newly added task: ${taskConfig.id}`)
        await messageManager.startBackup(taskConfig.id)
      }
      catch (error) {
        console.error('Failed to add task:', error)
        setError(`添加任务失败：${(error as Error).message}`)
      }
    },
    [addTask, setShowAddTaskDialog, setError, clearError],
  )

  const handleUpdateTask = useCallback(
    async (taskId: string, updates: Partial<TaskConfig>) => {
      try {
        clearError()

        // 如果更新了间隔，通知调度器重新计算时间
        if ('interval' in updates) {
          await messageManager.updateTask(taskId, updates)
        }
        else {
          await storageManager.updateTask(taskId, updates)
        }

        updateTask(taskId, updates)
      }
      catch (error) {
        console.error('Failed to update task:', error)
        setError(`更新任务失败：${(error as Error).message}`)
      }
    },
    [updateTask, setError, clearError],
  )

  const handleRemoveTask = useCallback(
    async (taskId: string) => {
      try {
        clearError()
        await storageManager.removeTask(taskId)
        removeTask(taskId)
      }
      catch (error) {
        console.error('Failed to remove task:', error)
        setError(`删除任务失败：${(error as Error).message}`)
      }
    },
    [removeTask, setError, clearError],
  )

  const handleExportTask = useCallback(
    async (taskId: string) => {
      try {
        clearError()
        const data = await storageManager.getBackupData(taskId)
        if (!data) {
          throw new Error('未找到备份数据')
        }

        const jsonString = JSON.stringify(data, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        // 创建下载链接
        const a = document.createElement('a')
        a.href = url
        a.download = `weibo_backup_${data.user.name}_${Date.now()}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
      catch (error) {
        console.error('Failed to export backup data:', error)
        setError(`导出备份数据失败：${(error as Error).message}`)
      }
    },
    [setError, clearError],
  )

  return {
    handleAddTask,
    handleUpdateTask,
    handleRemoveTask,
    handleExportTask,
  }
}
