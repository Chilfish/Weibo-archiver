export interface ImagePreviewEvent {
  index: number
  imgs: string[]
}

export interface AlbumPreviewEvent {
  postId: string
  idxOfImg: number
}

export interface AppConfig {
  theme: string
  imgHost: 'cdn' | 'original' | 'local' | 'custom'
  customImageUrl: string
}
