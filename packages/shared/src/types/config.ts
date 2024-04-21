import type { Post } from './post'

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
  name?: string
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
  hasFavorite?: boolean
  /**
   * 评论的数量
   */
  commentCount: number
  /**
   * 开始时间
   */
  startAt: number
  /**
   * 结束时间
   */
  endAt: number

  /**
   * 只获取关注列表
   */
  followingsOnly: boolean

  /**
   * 请求代理地址
   */
  proxyAgent?: string
  /**
   * 用户的 cookie
   */
  cookie?: string

  /**
   * 只爬取微博
   */
  weiboOnly: boolean

  /**
   * 保存帖子
   */
  savePost?: (posts: Post) => Promise<void>
}
