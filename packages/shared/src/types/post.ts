export type UID = `uid-${number}`

export interface User {
  uid: string
  name: string
  avatar: string
  remark?: string // 备注
}

export type UserBio = User & {
  bio: string
}

export interface UserInfo extends User {
  followers: number
  followings: number
  bio: string
  createdAt: string
  birthday: string
  postCount?: number
  exportedAt?: string
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
  created_at: string | number
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

  user?: User
  /**
   * 转发的卡片（page_info, url_struct）
   */
  card?: CardInfo
  /**
   * 转发的微博
   */
  retweeted_status?: Retweet

  is_show_bulletin?: 0 | 2

  comments: Comment[]
}

export type Retweet = Omit<Post, 'retweeted_status' | 'card' | 'user'> & {
  user?: User // 转发的微博可能被删除或是被夹
}

export type Comment = Pick<Post, 'text' | 'like_count' | 'comments_count' > & {
  img: string
  user: User
} & Meta

export interface PostMeta {
  total: number
  since_id: string
  page: number
  list: Post[]
}

export interface PostData {
  weibo: Post[]
  user: UserInfo
  followings: UserBio[]
}

export interface Album {
  url: string
  id: string
  date: string
}
