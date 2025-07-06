import type { AppConfig } from '@/types'
import { storageManager } from '@/lib/storageManager'

export class ConfigService {
  private static instance: ConfigService

  private constructor() {}

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService()
    }
    return ConfigService.instance
  }

  // 获取完整配置
  async getConfig(): Promise<AppConfig> {
    return await storageManager.getConfig()
  }

  // 更新配置
  async updateConfig(updates: Partial<AppConfig>): Promise<void> {
    await storageManager.saveConfig(updates)
  }

  // 设置全局配置并处理相关逻辑
  async setGlobalConfig(
    interval: number,
    autoStart: boolean,
    taskScheduler: any,
  ): Promise<void> {
    await storageManager.saveConfig({
      globalInterval: interval,
      autoStart,
    })

    if (autoStart) {
      // 重新初始化任务调度
      await taskScheduler.initializeTaskSchedules()
      console.log('Global config updated, tasks re-initialized')
    }
    else {
      // 停用所有任务
      const tasks = await storageManager.getTasks()
      for (const task of tasks) {
        if (task.enabled) {
          await taskScheduler.unscheduleTask(task.id)
        }
      }
      console.log('Auto start disabled, all tasks stopped')
    }
  }
}

export const configService = ConfigService.getInstance()
