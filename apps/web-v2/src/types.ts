export interface ImagePreviewEvent {
  index: number
  imgs: string[]
}

export interface AppConfig {
  theme: string
  imgHost: 'cdn' | 'original' | 'local' | 'custom'
  customImageUrl: string
}
