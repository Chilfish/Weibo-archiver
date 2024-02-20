export interface User {
  id: string
  screen_name: string
  profile_image_url: string
}

export type PicInfo = Record<string, {
  url: string
}>

export interface CardInfo {
  link: string
  title: string
  img: string
  desc?: string
}

export interface Meta {
  id: number
  region_name: string
  created_at: string
  detail_url?: string
  source?: string
}

export interface Post extends Meta {
  mblogid: string
  text: string
  imgs: string[]

  reposts_count: number
  comments_count: number
  like_count: number

  user: User
  /**
   * 转发的卡片（page_info, url_struct）
   */
  card?: CardInfo
  /**
   * 转发的微博
   */
  retweeted_status?: Retweet

  comments: Comment[]
}

export type Retweet = Omit<Post, 'retweeted_status' | 'card' | 'user'> & {
  user?: User // 转发的微博可能被删除或是被夹
}

export type Comment = Pick<Post, 'user' | 'text' | 'like_count' | 'comments_count' > & {
  img: string
} & Meta

export interface PostMeta {
  total: number
  since_id: string
  page: number
  list: Post[]
}
