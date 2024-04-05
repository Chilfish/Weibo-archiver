export interface AppConfig {
  version: string
  theme: 'light' | 'dark'
  dataPath: string
  configPath: string
  appPath: string
  publicPath: string
  osSep: '\\' | '/'

  useCdn: boolean
  fetchOptions: FetchOptions & {

    /**
     * 用户的 cookie
     */
    cookie: string
  }
}
