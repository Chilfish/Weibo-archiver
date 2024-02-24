import Config from 'conf'
import type { AppConfig } from '@types'

const now = Date.now()

const {
  VITE_APP_VERSION: version,
} = import.meta.env

const config = new Config<AppConfig>({
  watch: true,
  projectName: 'weibo-archiver',
  projectSuffix: '',
  defaults: {
    configPath: '',
    dataPath: '',
    appPath: '',
    publicPath: '',
    osSep: '/',
    version,
    theme: 'light',
    fetchOptions: {
      uid: '',
      name: '',
      cookie: '',
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

config.set('configPath', path)
// config.set('fetchOptions.cookie', cookie ?? '')

export default config
export {
  config,
}
