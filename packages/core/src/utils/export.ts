import type { Post, UserBio, UserInfo } from '@weibo-archiver/core'
import { WeiboParser } from '@weibo-archiver/core'
import fileSaver from 'file-saver'

export async function exportData(
  posts: Post[],
  userInfo?: UserInfo | null,
  followings?: UserBio[],
) {
  console.log('Exporting posts count:', posts.length)
  if (!userInfo?.name) {
    console.warn('User info is not available')
    return false
  }
  const { name } = userInfo
  const data = {
    weibo: posts,
    user: userInfo || {},
    followings: followings || [],
  }

  const dataStr = JSON.stringify(data)
  const imgsData = Array
    .from(WeiboParser.parseImgs(posts))
    .join(',\n') // csv 格式

  // toast.success('导出成功，正在下载数据...请允许浏览器批量下载文件')

  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  fileSaver.saveAs(dataBlob, `weibo-data-${name}.json`)

  if (imgsData.length) {
    const imgsDataBlob = new Blob([imgsData], { type: 'text/csv' })
    fileSaver.saveAs(imgsDataBlob, `imgs-${name}.csv`)
  }
  return true
}

export async function downloadFile(url: string, name: string) {
  fileSaver.saveAs(url, name)
}
