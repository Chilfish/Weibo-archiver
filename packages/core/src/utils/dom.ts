import type { Favorite, Post, UserBio, UserInfo } from '@weibo-archiver/core'
import { WeiboParser } from '@weibo-archiver/core'
import fileSaver from 'file-saver'

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export async function readFile(e: Event) {
  return new Promise<string>((resolve, reject) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) {
      reject(new Error('No file selected'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      resolve(data)
    }
    reader.readAsText(file)
  })
}

export async function exportData(data: {
  weibo: Post[]
  user: UserInfo | null
  followings: UserBio[]
  favorites: Favorite[]
}) {
  console.log('Exporting posts count:', data.weibo.length)
  if (!data.user?.name) {
    console.warn('User info is not available')
    return false
  }

  const { name: username } = data.user

  const dataStr = JSON.stringify(data)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  fileSaver.saveAs(dataBlob, `weibo-data-${username}.json`)

  const imgsData = [
    data.weibo,
    data.favorites,
  ]
    .flatMap(WeiboParser.parseImgs)
    .filter(Boolean)
    .join(',\n') // csv 格式

  if (imgsData.length) {
    const imgsDataBlob = new Blob([imgsData], { type: 'text/csv' })
    fileSaver.saveAs(imgsDataBlob, `imgs-${username}.csv`)
  }
  return true
}
