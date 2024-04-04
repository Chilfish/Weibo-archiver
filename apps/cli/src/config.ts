import { homedir } from 'node:os'
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { loadConfig } from 'c12'
import { effect, reactive } from '@vue/reactivity'
import type { FetchOptions } from '@weibo-archiver/shared'

export const savePath = join(homedir(), 'weibo-archiver')
export const configFile = join(homedir(), '.config/weibo-archiver.json')

type Config = Omit<FetchOptions, 'name'> & {
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

async function saveConfig(config: Config) {
  await writeFile(configFile, JSON.stringify(config, null, 2))
}

const config = await loadConfig<Config>({
  cwd: savePath,
  configFile,
  defaultConfig: {
    savePath,
    cookie: '',
    uid: '',
    curPage: 1,
    fetchedCount: 0,
    isFetchAll: false,
    largePic: true,
    repostPic: true,
    hasRepost: true,
    hasComment: true,
    hasFavorite: true,
    commentCount: 10,
    startAt: Date.now(),
    endAt: Date.now(),
    followingsOnly: false,
  },

}).then(r => reactive(r.config!))

effect(async () => {
  await saveConfig(config)
}, {
  lazy: true,
})

if (!existsSync(configFile))
  await saveConfig(config)

if (!existsSync(savePath))
  await mkdir(savePath, { recursive: true })

export default config
