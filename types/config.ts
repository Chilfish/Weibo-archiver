import type Conf from 'conf'

/**
 * 解析、爬取时的配置
 */
export interface FetchOptions {
  /**
   * 用户 id
   */
  uid: string
  /**
   * 用户名
   */
  name: string
  /**
   * 鉴权字段，必须得登录才获取，匿名只能获取前两页。并且只能往前翻页，同一个 id 对于即便不同 page 的结果也是一样的
   */
  since_id: string
  /**
   * 已获取的页数
   */
  curPage: number
  /**
   * 已获取到的数量
   */
  fetchedCount: number
  /**
   * 是否获取全部微博
   */
  isFetchAll: boolean
  /**
   * 下载图片的尺寸
   */
  largePic: boolean
  /**
   * 是否包含转发的微博的图片
   */
  repostPic: boolean
  /**
   * 是否包含转发的微博
   */
  hasRepost: boolean
  /**
   * 是否包含评论
   */
  hasComment: boolean
  /**
   * 包括收藏的微博
   */
  hasFavorite: boolean
  /**
   * 评论的数量
   */
  commentCount: number
  /**
   * 日期范围
   */
  dateRange: [number, number]
}

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

type OnChange = (callback: (newValue: AppConfig, oldValue: AppConfig) => void) => Function

export type Config = Pick<Conf<AppConfig>, 'get' | 'set' | 'path'> & {
  data: AppConfig
  onChange: OnChange
}
