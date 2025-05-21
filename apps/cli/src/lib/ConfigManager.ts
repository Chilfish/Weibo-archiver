import type { FetchConfig } from '@weibo-archiver/core'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import path from 'node:path'
import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core/src/constants'
import { readJson, saveJson } from '../utils'

export type Config = Omit<FetchConfig, 'startAt' | 'endAt' | 'restore'> & {
  cookie: string
  uid: string
  startAt: string
  endAt: string
}

export class ConfigManager {
  private config: Config

  constructor(uid: string) {
    this.config = {
      ...DEFAULT_FETCH_CONFIG,
      uid,
      cookie: '',
      startAt: '',
      endAt: '',
    }
  }

  get uid(): string {
    return this.config.uid || ''
  }

  set uid(uid: string) {
    this.config.uid = uid
  }

  get savePath(): string {
    return path.join(homedir(), '.config/weibo-archiver/', this.uid)
  }

  public async load(): Promise<Config> {
    const configPath = this.savePath

    if (!existsSync(configPath)) {
      await mkdir(configPath, { recursive: true })
    }

    this.config = await readJson<Config>(path.join(configPath, 'config.json'))

    return this.config
  }

  public async update(newConfig: Partial<Config>) {
    Object.assign(this.config, newConfig)

    await saveJson({
      savePath: this.savePath,
      filename: 'config.json',
      data: this.config,
      intend: 2,
    })
  }

  public get(): Config {
    return { ...this.config }
  }
}
