import type { AppConfig } from '@/types/storage'
import { useCallback } from 'react'
import { messageManager } from '@/lib/messaging'
import { storageManager } from '@/lib/storage'
import { useConfigStore } from '@/lib/stores/useConfigStore'
import { useUIStore } from '@/lib/stores/useUIStore'

export const useConfigOperations = () => {
  const { updateConfig, setError, clearError } = useConfigStore()

  const { setShowSettingsDialog } = useUIStore()

  const handleSaveSettings = useCallback(
    async (newConfig: Partial<AppConfig>) => {
      try {
        clearError()
        await storageManager.saveConfig(newConfig)
        updateConfig(newConfig)
        setShowSettingsDialog(false)

        // 如果更新了全局配置，通知后台脚本
        if ('globalInterval' in newConfig || 'autoStart' in newConfig) {
          const currentConfig = useConfigStore.getState().config
          await messageManager.setGlobalConfig(
            newConfig.globalInterval ?? currentConfig.globalInterval,
            newConfig.autoStart ?? currentConfig.autoStart,
          )
        }
      }
      catch (error) {
        console.error('Failed to save settings:', error)
        setError(`保存设置失败：${(error as Error).message}`)
      }
    },
    [updateConfig, setShowSettingsDialog, setError, clearError],
  )

  const handleExportData = useCallback(async () => {
    try {
      clearError()
      const data = await storageManager.exportData()

      // 创建下载链接
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `weibo_backup_settings_${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    catch (error) {
      console.error('Failed to export data:', error)
      setError(`导出失败：${(error as Error).message}`)
    }
  }, [setError, clearError])

  const handleExportAllBackupData = useCallback(async () => {
    try {
      clearError()
      const allData = await storageManager.getAllBackupData()
      if (Object.keys(allData).length === 0) {
        throw new Error('没有备份数据可导出')
      }

      const jsonString = JSON.stringify(allData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      // 创建下载链接
      const a = document.createElement('a')
      a.href = url
      const config = useConfigStore.getState().config
      const prefix = config.saveDirectory || 'weibo_backup'
      a.download = `${prefix}_all_${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    catch (error) {
      console.error('Failed to export backup data:', error)
      setError(`导出备份数据失败：${(error as Error).message}`)
    }
  }, [setError, clearError])

  const handleImportData = useCallback(
    async (file: File) => {
      try {
        clearError()
        const text = await file.text()
        await storageManager.importData(text)

        // 刷新页面以重新加载数据
        window.location.reload()
      }
      catch (error) {
        console.error('Failed to import data:', error)
        setError(`导入失败：${(error as Error).message}`)
      }
    },
    [setError, clearError],
  )

  const handleClearAllData = useCallback(async () => {
    try {
      clearError()
      await storageManager.clearAllData()
      setShowSettingsDialog(false)

      // 刷新页面
      window.location.reload()
    }
    catch (error) {
      console.error('Failed to clear data:', error)
      setError(`清空数据失败：${(error as Error).message}`)
    }
  }, [setShowSettingsDialog, setError, clearError])

  return {
    handleSaveSettings,
    handleExportData,
    handleExportAllBackupData,
    handleImportData,
    handleClearAllData,
  }
}
