import type {
  AppConfig,
  StorageData,
  TaskConfig,
  TaskStatus,
  WeiboData,
} from '@/types/storage'
import { defineExtensionStorage } from '@webext-core/storage'
import browser from 'webextension-polyfill'
import { taskScheduler } from '@/entrypoints/background/taskScheduler'
import { DataDeduplicator } from '@/lib/deduplication'
import { DEFAULT_APP_CONFIG } from './constants'

export interface StorageSchema {
  cookies: string
  curUid: string
  tasks: TaskConfig[]
  config: AppConfig
  task_statuses: Record<string, TaskStatus>
  meta: Record<string, any>
  data: Record<string, WeiboData>
}

export type StorageKey = keyof StorageSchema

const extensionStorage = defineExtensionStorage<StorageSchema>(
  browser.storage.local,
)

export class StorageManager {
  constructor() {}
  static async getItem<K extends StorageKey>(
    key: K,
    fallback: StorageSchema[K],
  ): Promise<StorageSchema[K]> {
    return extensionStorage
      .getItem(key)
      .then(value => value || fallback)
      .catch(() => fallback)
  }

  static async setItem<K extends StorageKey>(
    key: K,
    value: StorageSchema[K],
  ): Promise<void> {
    await extensionStorage.setItem(key, value)
  }

  async getCurUid(): Promise<string> {
    return StorageManager.getItem('curUid', '')
  }

  async setCurUid(uid: string): Promise<void> {
    return StorageManager.setItem('curUid', uid)
  }

  async getTasks(): Promise<TaskConfig[]> {
    return StorageManager.getItem('tasks', [])
  }

  async saveTasks(tasks: TaskConfig[]): Promise<void> {
    return StorageManager.setItem('tasks', tasks)
  }

  async addTask(task: TaskConfig): Promise<void> {
    const tasks = await this.getTasks()
    const existingIndex = tasks.findIndex(t => t.uid === task.uid)
    if (existingIndex !== -1) {
      return
    }

    tasks.push(task)
    await this.saveTasks(tasks)
    // 加入之后就立刻运行
    await taskScheduler.executeTask(task)
  }

  async removeTask(taskId: string): Promise<void> {
    const tasks = await this.getTasks()
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    await this.saveTasks(filteredTasks)

    // 清理相关数据
    const statuses = await this.getTaskStatuses()
    delete statuses[taskId]
    await this.saveTaskStatuses(statuses)
    await this.deleteBackupData(taskId)
  }

  async updateTask(
    taskId: string,
    updates: Partial<TaskConfig>,
  ): Promise<void> {
    const tasks = await this.getTasks()
    const taskIndex = tasks.findIndex(task => task.id === taskId)

    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
      await this.saveTasks(tasks)
    }
  }

  // ============ 配置管理 ============
  async getConfig(): Promise<AppConfig> {
    const config = await StorageManager.getItem(
      'config',
      DEFAULT_APP_CONFIG,
    )
    return { ...DEFAULT_APP_CONFIG, ...(config as Partial<AppConfig>) }
  }

  async saveConfig(config: Partial<AppConfig>): Promise<void> {
    const currentConfig = await this.getConfig()
    const newConfig = { ...currentConfig, ...config }
    await StorageManager.setItem('config', newConfig)
  }

  async setGlobalConfig(
    interval: number,
  ): Promise<void> {
    await this.saveConfig({
      globalInterval: interval,
    })
  }

  // ============ 任务状态管理 ============
  async getTaskStatuses(): Promise<Record<string, TaskStatus>> {
    return await StorageManager.getItem('task_statuses', {})
  }

  async saveTaskStatuses(statuses: Record<string, TaskStatus>): Promise<void> {
    return await StorageManager.setItem('task_statuses', statuses)
  }

  async updateTaskStatus(
    taskId: string,
    status: Partial<TaskStatus>,
  ): Promise<void> {
    const statuses = await this.getTaskStatuses()
    statuses[taskId] = {
      ...statuses[taskId],
      ...status,
      id: taskId,
    }
    await this.saveTaskStatuses(statuses)
  }

  // ============ 备份数据管理 ============
  async saveBackupData(taskId: string, data: WeiboData): Promise<void> {
    try {
      const allData = await StorageManager.getItem('data', {})

      const existingData = allData[taskId]
      if (existingData && existingData.weibo && existingData.weibo.length > 0) {
        const allPosts = [...existingData.weibo, ...data.weibo]
        const uniquePosts = DataDeduplicator.deduplicateByMblogId(allPosts)

        uniquePosts.sort((a, b) => {
          const timeA = new Date(a.createdAt).getTime()
          const timeB = new Date(b.createdAt).getTime()
          return timeB - timeA
        })

        data = {
          ...data,
          weibo: uniquePosts,
          lastUpdated: Date.now(),
        }
      }

      allData[taskId] = data
      await StorageManager.setItem('data', allData)

      // 更新备份元数据
      await this.updateBackupMeta(taskId, {
        lastBackup: Date.now(),
        totalPosts: data.weibo.length,
        dataSize: JSON.stringify(data).length,
      })

      console.log(
        `Backup data saved for task ${taskId}, ${data.weibo.length} posts`,
      )
    }
    catch (error) {
      console.error('Failed to save backup data:', error)
      throw error
    }
  }

  async getBackupData(taskId: string): Promise<WeiboData | null> {
    const data = await this.getAllWeiboData()
    return data[taskId] || null
  }

  async getAllWeiboData(): Promise<Record<string, WeiboData>> {
    return StorageManager.getItem('data', {})
  }

  async deleteBackupData(taskId: string): Promise<void> {
    const allData = await this.getAllWeiboData()
    delete allData[taskId]
    await StorageManager.setItem('data', allData)
  }

  // ============ 备份元数据管理 ============
  async getBackupMeta(): Promise<Record<string, any>> {
    return StorageManager.getItem('meta', {})
  }

  async saveBackupMeta(meta: Record<string, any>): Promise<void> {
    return StorageManager.setItem('meta', meta)
  }

  async updateBackupMeta(taskId: string, meta: any): Promise<void> {
    const allMeta = await this.getBackupMeta()
    allMeta[taskId] = { ...allMeta[taskId], ...meta }
    await this.saveBackupMeta(allMeta)
  }

  // ============ 数据导入导出 ============
  async getAllData(): Promise<StorageData> {
    const [tasks, config, taskStatuses, backupMeta] = await Promise.all([
      this.getTasks(),
      this.getConfig(),
      this.getTaskStatuses(),
      this.getBackupMeta(),
    ])

    return {
      tasks,
      config,
      taskStatuses,
      backupMeta,
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await Promise.all([
        extensionStorage.removeItem('tasks'),
        extensionStorage.removeItem('config'),
        extensionStorage.removeItem('task_statuses'),
        extensionStorage.removeItem('meta'),
        extensionStorage.removeItem('data'),
      ])
    }
    catch (error) {
      console.error('Failed to clear all data:', error)
      throw error
    }
  }

  async exportData(): Promise<string> {
    const data = await this.getAllData()
    return JSON.stringify(data, null, 2)
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data: StorageData = JSON.parse(jsonData)

      await Promise.all([
        this.saveTasks(data.tasks || []),
        this.saveConfig(data.config || DEFAULT_APP_CONFIG),
        this.saveTaskStatuses(data.taskStatuses || {}),
        this.saveBackupMeta(data.backupMeta || {}),
      ])
    }
    catch (error) {
      console.error('Failed to import data:', error)
      throw new Error(`导入数据失败：${(error as Error).message}`)
    }
  }
}

export const storageManager = new StorageManager()
