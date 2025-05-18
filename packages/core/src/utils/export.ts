import type { Favorite, Post, UserBio, UserInfo } from '@weibo-archiver/core'
import { WeiboParser } from '@weibo-archiver/core'
import fileSaver from 'file-saver'

export async function exportData(data: {
  posts: Post[]
  user: UserInfo | null
  followings: UserBio[]
  favorites: Favorite[]
}) {
  console.log('Exporting posts count:', data.posts.length)
  if (!data.user?.name) {
    console.warn('User info is not available')
    return false
  }

  const { name: username } = data.user

  const dataStr = JSON.stringify(data)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  fileSaver.saveAs(dataBlob, `weibo-data-${username}.json`)

  const imgsData = [data.posts, data.favorites]
    .flatMap(WeiboParser.parseImgs)
    .join(',\n') // csv 格式

  if (imgsData.length) {
    const imgsDataBlob = new Blob([imgsData], { type: 'text/csv' })
    fileSaver.saveAs(imgsDataBlob, `imgs-${username}.csv`)
  }
  return true
}
