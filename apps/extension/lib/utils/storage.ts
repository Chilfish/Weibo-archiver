import { defineExtensionStorage } from '@webext-core/storage'
import browser from 'webextension-polyfill'

export interface ExtensionStorageSchema {
  cookies: string
  curUid: string
  weibo_backup_tasks: import('@/types/storage').TaskConfig[]
  weibo_backup_config: import('@/types/storage').AppConfig
  weibo_backup_task_statuses: Record<
    string,
    import('@/types/storage').TaskStatus
  >
  weibo_backup_meta: Record<string, any>
  weibo_backup_data: Record<string, import('@/types/storage').BackupData>
}

export const extensionStorage = defineExtensionStorage<ExtensionStorageSchema>(
  browser.storage.local,
)
