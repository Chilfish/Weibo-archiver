import type {
  AppConfig,
  StorageData,
  TaskConfig,
  TaskStatus,
  WeiboData,
} from '@/types/storage'
import { defineExtensionStorage } from '@webext-core/storage'
import browser from 'webextension-polyfill'
import { DEFAULT_APP_CONFIG } from './constants'

export interface ExtensionStorageSchema {
  cookies: string
  curUid: string
  weibo_backup_tasks: TaskConfig[]
  weibo_backup_config: AppConfig
  weibo_backup_task_statuses: Record<string, TaskStatus>
  weibo_backup_meta: Record<string, any>
  weibo_backup_data: Record<string, WeiboData>
}

export const extensionStorage = defineExtensionStorage<ExtensionStorageSchema>(
  browser.storage.local,
)

class StorageManager {
  private static instance: StorageManager

  private constructor() {}

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager()
    }
    return StorageManager.instance
  }

  // ============ 任务管理 ============
  async getTasks(): Promise<TaskConfig[]> {
    try {
      const tasks = await extensionStorage.getItem('weibo_backup_tasks')
      return (tasks as TaskConfig[]) || []
    }
    catch (error) {
      console.error('Failed to get tasks:', error)
      return []
    }
  }

  async saveTasks(tasks: TaskConfig[]): Promise<void> {
    try {
      await extensionStorage.setItem('weibo_backup_tasks', tasks)
    }
    catch (error) {
      console.error('Failed to save tasks:', error)
      throw error
    }
  }

  async addTask(task: TaskConfig): Promise<void> {
    const tasks = await this.getTasks()
    const existingIndex = tasks.findIndex(t => t.uid === task.uid)
    if (existingIndex !== -1) {
      return
    }

    tasks.push(task)
    await this.saveTasks(tasks)
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
    try {
      const config = await extensionStorage.getItem('weibo_backup_config')
      return { ...DEFAULT_APP_CONFIG, ...(config as Partial<AppConfig>) }
    }
    catch (error) {
      console.error('Failed to get config:', error)
      return DEFAULT_APP_CONFIG
    }
  }

  async saveConfig(config: Partial<AppConfig>): Promise<void> {
    try {
      const currentConfig = await this.getConfig()
      const newConfig = { ...currentConfig, ...config }
      await extensionStorage.setItem('weibo_backup_config', newConfig)
    }
    catch (error) {
      console.error('Failed to save config:', error)
      throw error
    }
  }

  // ============ 任务状态管理 ============
  async getTaskStatuses(): Promise<Record<string, TaskStatus>> {
    try {
      const statuses = await extensionStorage.getItem(
        'weibo_backup_task_statuses',
      )
      return (statuses as Record<string, TaskStatus>) || {}
    }
    catch (error) {
      console.error('Failed to get task statuses:', error)
      return {}
    }
  }

  async saveTaskStatuses(statuses: Record<string, TaskStatus>): Promise<void> {
    try {
      await extensionStorage.setItem('weibo_backup_task_statuses', statuses)
    }
    catch (error) {
      console.error('Failed to save task statuses:', error)
      throw error
    }
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
      const allData
        = (await extensionStorage.getItem('weibo_backup_data')) || {}

      // 智能合并数据
      const existingData = allData[taskId]
      if (existingData && existingData.weibo && existingData.weibo.length > 0) {
        const allPosts = [...existingData.weibo, ...data.weibo]
        const uniquePosts = this.deduplicatePostsByMblogId(allPosts)

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

        console.log(`Merged backup data for task ${taskId}:`, {
          previousCount: existingData.weibo.length,
          newCount: data.weibo.length - existingData.weibo.length,
          totalCount: data.weibo.length,
        })
      }

      allData[taskId] = data
      await extensionStorage.setItem('weibo_backup_data', allData)

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
    try {
      const allData
        = (await extensionStorage.getItem('weibo_backup_data')) || {}
      return allData[taskId] || null
    }
    catch (error) {
      console.error('Failed to get backup data:', error)
      return null
    }
  }

  async getAllWeiboData(): Promise<Record<string, WeiboData>> {
    try {
      return (await extensionStorage.getItem('weibo_backup_data')) || {}
    }
    catch (error) {
      console.error('Failed to get all backup data:', error)
      return {}
    }
  }

  async deleteBackupData(taskId: string): Promise<void> {
    try {
      const allData
        = (await extensionStorage.getItem('weibo_backup_data')) || {}
      delete allData[taskId]
      await extensionStorage.setItem('weibo_backup_data', allData)
    }
    catch (error) {
      console.error('Failed to delete backup data:', error)
      throw error
    }
  }

  // ============ 备份元数据管理 ============
  async getBackupMeta(): Promise<Record<string, any>> {
    try {
      const meta = await extensionStorage.getItem('weibo_backup_meta')
      return (meta as Record<string, any>) || {}
    }
    catch (error) {
      console.error('Failed to get backup meta:', error)
      return {}
    }
  }

  async saveBackupMeta(meta: Record<string, any>): Promise<void> {
    try {
      await extensionStorage.setItem('weibo_backup_meta', meta)
    }
    catch (error) {
      console.error('Failed to save backup meta:', error)
      throw error
    }
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
        extensionStorage.removeItem('weibo_backup_tasks'),
        extensionStorage.removeItem('weibo_backup_config'),
        extensionStorage.removeItem('weibo_backup_task_statuses'),
        extensionStorage.removeItem('weibo_backup_meta'),
        extensionStorage.removeItem('weibo_backup_data'),
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

  // ============ 工具方法 ============
  private deduplicatePostsByMblogId(posts: any[]): any[] {
    const uniquePosts = new Map<string, any>()

    for (const post of posts) {
      if (post.mblogid && !uniquePosts.has(post.mblogid)) {
        uniquePosts.set(post.mblogid, post)
      }
    }

    return Array.from(uniquePosts.values())
  }
}

export const storageManager = StorageManager.getInstance()
