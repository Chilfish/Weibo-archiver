import { join } from 'node:path'
import Config from 'conf'
import type { AppConfig } from '@types'

const config = new Config<AppConfig>({
  watch: true,
  projectName: 'weibo-archiver',
  projectSuffix: '',
})

const path = config.path.replace(/config\.json$/, '')

config.set({
  configPath: path,
  dataPath: join(path, '../data'),
  version: import.meta.env.VITE_APP_VERSION,
})

export default config
export {
  config,
}
