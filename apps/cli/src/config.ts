import type { FetchOptions } from '@weibo-archiver/shared'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { loadConfig } from 'c12'

export const defaultSavePath = (uid: string) => join(homedir(), 'weibo-archiver', uid)
export const defaultConfigFile = (uid: string) => join(defaultSavePath(uid), 'config.json')

export type Config = Omit<FetchOptions, 'name'> & {
  /**
   * 必填，微博登录的 cookie
   */
  cookie: string
  /**
   * 保存路径
   * @default ~/weibo-archiver/
   */
  savePath: string
}

export async function getConfig(
  uid: string,
  savePath = defaultSavePath(uid),
) {
  const configFile = 'config.json'

  if (!existsSync(savePath))
    await mkdir(savePath, { recursive: true })

  const config = await loadConfig<Config>({
    cwd: savePath,
    configFile,
    defaultConfig: {
      savePath,
      cookie: '',
      uid: '',
      curPage: 0,
      fetchedCount: 0,
      isFetchAll: false,
      largePic: true,
      repostPic: true,
      hasRepost: true,
      hasComment: true,
      commentCount: 10,
      startAt: Date.now(),
      endAt: Date.now(),
      followingsOnly: false,
      weiboOnly: false,
      proxyAgent: '',
    },
  }).then(v => v.config!);
  (globalThis as any).fetchOptions = config

  await saveConfig(config)
  return config
}

export async function saveConfig(config: Config) {
  if (!config.uid)
    return
  (globalThis as any).fetchOptions = config

  const path = join(config.savePath, 'config.json')
  await writeFile(path, JSON.stringify(config, null, 2), 'utf-8')
}
