import type { Post } from '@weibo-archiver/core'

export interface ImagePreviewEvent {
  index: number
  imgs: string[]
}

export interface AlbumPreviewEvent {
  idxOfPost: number
  idxOfImg: number
  posts: Post[]
}

export interface AppConfig {
  theme: string
  imgHost: 'cdn' | 'original' | 'local' | 'custom'
  customImageUrl: string
  syncTime: {
    weibo: number
    followings: number
    bookmarks: number
  }
}
