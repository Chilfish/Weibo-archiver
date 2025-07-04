import type { UserInfo } from '@weibo-archiver/core'
import type {
  AppConfig,
  BackupData,
  StorageData,
  TaskConfig,
  TaskStatus,
} from '@/types/storage'
import { extensionStorage } from '@/lib/utils/storage'
import { DEFAULT_APP_CONFIG } from './constants'

class StorageManager {
  private static instance: StorageManager

  private constructor() {}

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager()
    }
    return StorageManager.instance
  }

  // 获取所有任务
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

  // 保存任务
  async saveTasks(tasks: TaskConfig[]): Promise<void> {
    try {
      await extensionStorage.setItem('weibo_backup_tasks', tasks)
    }
    catch (error) {
      console.error('Failed to save tasks:', error)
      throw error
    }
  }

  // 添加任务
  async addTask(task: TaskConfig): Promise<void> {
    const tasks = await this.getTasks()

    // 检查是否已存在相同 UID 的任务
    const existingIndex = tasks.findIndex(t => t.uid === task.uid)
    if (existingIndex !== -1) {
      return
    }

    // 添加新任务
    tasks.push(task)
    await this.saveTasks(tasks)
  }

  // 批量添加任务（从本地用户数据）
  async addTasksFromUsers(users: UserInfo[]): Promise<{
    added: number
    skipped: number
    errors: string[]
  }> {
    const tasks = await this.getTasks()
    const existingUids = new Set(tasks.map(t => t.uid))

    const result = {
      added: 0,
      skipped: 0,
      errors: [] as string[],
    }

    const newTasks: TaskConfig[] = []
    const now = Date.now()

    for (const user of users) {
      try {
        // 跳过已存在的用户
        if (existingUids.has(user.uid)) {
          result.skipped++
          continue
        }

        // 创建任务配置
        const taskConfig: TaskConfig = {
          id: user.uid, // 使用 UID 作为任务 ID
          uid: user.uid,
          username: user.name,
          avatar: user.avatar || '',
          url: `https://weibo.com/u/${user.uid}`,
          enabled: true,
          interval: 30, // 默认30分钟间隔
          lastCheck: 0,
          lastPostDate: 0,
          totalPosts: 0,
          isFirstBackup: true,
          nextRunTime: now + (result.added * 10 + 5) * 1000, // 错开执行时间，避免同时执行
          addedAt: now,
        }

        newTasks.push(taskConfig)
        existingUids.add(user.uid) // 防止重复添加
        result.added++
      }
      catch (error) {
        result.errors.push(
          `添加用户 ${user.name} (${user.uid}) 失败: ${(error as Error).message}`,
        )
      }
    }

    // 批量保存任务
    if (newTasks.length > 0) {
      const allTasks = [...tasks, ...newTasks]
      await this.saveTasks(allTasks)
    }

    return result
  }

  // 删除任务
  async removeTask(taskId: string): Promise<void> {
    const tasks = await this.getTasks()
    const filteredTasks = tasks.filter(task => task.id !== taskId)
    await this.saveTasks(filteredTasks)

    // 同时删除任务状态
    const statuses = await this.getTaskStatuses()
    delete statuses[taskId]
    await this.saveTaskStatuses(statuses)

    // 删除备份数据
    await this.deleteBackupData(taskId)
  }

  // 更新任务
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

  // 获取应用配置
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

  // 保存应用配置
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

  // 获取任务状态
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

  // 保存任务状态
  async saveTaskStatuses(statuses: Record<string, TaskStatus>): Promise<void> {
    try {
      await extensionStorage.setItem('weibo_backup_task_statuses', statuses)
    }
    catch (error) {
      console.error('Failed to save task statuses:', error)
      throw error
    }
  }

  // 更新单个任务状态
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

  // 获取备份元数据
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

  // 保存备份元数据
  async saveBackupMeta(meta: Record<string, any>): Promise<void> {
    try {
      await extensionStorage.setItem('weibo_backup_meta', meta)
    }
    catch (error) {
      console.error('Failed to save backup meta:', error)
      throw error
    }
  }

  // 更新备份元数据
  async updateBackupMeta(taskId: string, meta: any): Promise<void> {
    const allMeta = await this.getBackupMeta()
    allMeta[taskId] = { ...allMeta[taskId], ...meta }
    await this.saveBackupMeta(allMeta)
  }

  // 保存备份数据（智能合并）
  async saveBackupData(taskId: string, data: BackupData): Promise<void> {
    try {
      const allData
        = (await extensionStorage.getItem('weibo_backup_data')) || {}

      // 如果已有数据，进行智能合并
      const existingData = allData[taskId]
      if (existingData && existingData.weibo && existingData.weibo.length > 0) {
        // 合并微博数据并去重
        const allPosts = [...existingData.weibo, ...data.weibo]
        const uniquePosts = this.deduplicatePostsByMblogId(allPosts)

        // 按时间倒序排列
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
    }
    catch (error) {
      console.error('Failed to save backup data:', error)
      throw error
    }
  }

  // 获取备份数据
  async getBackupData(taskId: string): Promise<BackupData | null> {
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

  // 获取所有备份数据
  async getAllBackupData(): Promise<Record<string, BackupData>> {
    try {
      return (await extensionStorage.getItem('weibo_backup_data')) || {}
    }
    catch (error) {
      console.error('Failed to get all backup data:', error)
      return {}
    }
  }

  // 删除备份数据
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

  // 清空所有备份数据
  async clearAllBackupData(): Promise<void> {
    try {
      await extensionStorage.removeItem('weibo_backup_data')
    }
    catch (error) {
      console.error('Failed to clear all backup data:', error)
      throw error
    }
  }

  // 获取所有存储数据
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

  // 清空所有数据
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

  // 导出数据
  async exportData(): Promise<string> {
    const data = await this.getAllData()
    return JSON.stringify(data, null, 2)
  }

  // 导入数据
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

  // 根据微博ID去重
  private deduplicatePostsByMblogId(posts: any[]): any[] {
    const uniquePosts = new Map<string, any>()

    for (const post of posts) {
      if (post.mblogid && !uniquePosts.has(post.mblogid)) {
        uniquePosts.set(post.mblogid, post)
      }
    }

    return Array.from(uniquePosts.values())
  }

  // 获取任务的备份统计
  async getBackupStats(taskId: string): Promise<{
    totalPosts: number
    lastBackup: number
    dataSize: number
    oldestPost: number
    newestPost: number
  }> {
    try {
      const data = await this.getBackupData(taskId)
      if (!data || !data.weibo || data.weibo.length === 0) {
        return {
          totalPosts: 0,
          lastBackup: 0,
          dataSize: 0,
          oldestPost: 0,
          newestPost: 0,
        }
      }

      const posts = data.weibo
      const postTimes = posts.map(p => new Date(p.createdAt).getTime())

      return {
        totalPosts: posts.length,
        lastBackup: data.lastUpdated || 0,
        dataSize: JSON.stringify(data).length,
        oldestPost: Math.min(...postTimes),
        newestPost: Math.max(...postTimes),
      }
    }
    catch (error) {
      console.error('Failed to get backup stats:', error)
      return {
        totalPosts: 0,
        lastBackup: 0,
        dataSize: 0,
        oldestPost: 0,
        newestPost: 0,
      }
    }
  }
}

export const storageManager = StorageManager.getInstance()

// 文件系统相关工具
export class FileSystemManager {
  private static instance: FileSystemManager

  private constructor() {}

  static getInstance(): FileSystemManager {
    if (!FileSystemManager.instance) {
      FileSystemManager.instance = new FileSystemManager()
    }
    return FileSystemManager.instance
  }

  // 保存备份数据到插件存储
  async saveBackupData(taskId: string, data: BackupData): Promise<void> {
    try {
      // 保存到插件存储
      await storageManager.saveBackupData(taskId, data)

      // 更新备份元数据
      await storageManager.updateBackupMeta(taskId, {
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
}

export const fileSystemManager = FileSystemManager.getInstance()
