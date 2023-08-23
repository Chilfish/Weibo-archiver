export interface User {
  idstr: string
  screen_name: string
  profile_image_url: string
}

export interface PicInfo {
  largest: {
    url: string
  }
}

export interface Post {
  id: string
  mblogid: string
  created_at: string
  user: User
  text_raw: string
  /**
   *  需要展开的长文本
   *  https://weibo.com/ajax/statuses/longtext?id=${mblogid}
   */
  isLongText: boolean

  pic_num: number
  pic_ids: string[]
  pic_infos: Record<string, PicInfo> // 从 pic_infos[pic_id].largest.url 中提取原图链接

  reposts_count: number
  comments_count: number
  attitudes_count: number

  source: string
  region_name: string
  retweeted_status?: Post
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
