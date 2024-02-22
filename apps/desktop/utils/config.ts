import Config from 'conf'
import type { AppConfig } from '@types'

const now = Date.now()

const config = new Config<AppConfig>({
  watch: true,
  projectName: 'weibo-archiver',
  projectSuffix: '',
  defaults: {
    configPath: '',
    dataPath: '',
    version: import.meta.env.VITE_APP_VERSION,
    theme: 'light',
    fetchOptions: {
      uid: '',
      name: '',
      isFetchAll: true,
      picLarge: true,
      repostPic: true,
      repost: true,
      comment: true,
      commentCount: 10,
      dateRange: [now, now],
    },
  },
})

const path = config.path.replace(/config\.json$/, '')

config.set({
  configPath: path,
})

export default config
export {
  config,
}
