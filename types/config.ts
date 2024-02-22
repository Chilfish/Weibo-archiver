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
   * 是否获取全部微博
   */
  isFetchAll: boolean

  /**
   * 下载图片的尺寸
   */
  picLarge: boolean
  /**
   * 是否包含转发的微博的图片
   */
  repostPic: boolean
  /**
   * 是否包含转发的微博
   */
  repost: boolean
  /**
   * 是否包含评论
   */
  comment: boolean
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

  fetchOptions: FetchOptions
}
