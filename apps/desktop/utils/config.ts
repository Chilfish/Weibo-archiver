import Config from 'conf'
import type { AppConfig } from 'packages/shared/src/types'

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
    useCdn: false,
    fetchOptions: {
      uid: '',
      name: '',
      cookie: '',
      isFetchAll: true,
      largePic: true,
      repostPic: true,
      hasComment: true,
      hasRepost: true,
      commentCount: 10,
      dateRange: [now, now],
    },
  },
})

const path = config.path.replace(/config\.json$/, '')

config.set('configPath', path)
config.set('version', version)
config.set('fetchOptions.dateRange', [now, now])

export default config
export {
  config,
}
