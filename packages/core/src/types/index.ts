export * from './protocol'

export interface User {
  id: string
  screen_name: string
  profile_image_url: string
}

export interface PicInfo {
  largest: {
    url: string
  }
}

export interface CardInfo {
  link: string
  title: string
  img: string
  desc?: string
}

export interface Post {
  id: string
  mblogid: string
  created_at: string
  user: User
  text: string
  /**
   *  需要展开的长文本
   *  https://weibo.com/ajax/statuses/longtext?id=${mblogid}
   */
  isLongText: boolean
  imgs: string[]

  reposts_count: number
  comments_count: number
  attitudes_count: number

  source: string
  region_name: string

  /**
   * 转发的卡片（page_info, url_struct）
   */
  card?: CardInfo
  /**
   * 转发的微博
   */
  retweeted_status?: Omit<Post, 'retweeted_status' | 'card'>
}

export interface Comment {

}

export interface PostMeta {
  uid: string
  total: number
  since_id: string
  page: number
  list: Post[]
}
