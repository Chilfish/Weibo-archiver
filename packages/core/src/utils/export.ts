import type { Post, UserBio, UserInfo } from '@shared'
import { imgsParser } from '@shared'
import fileSaver from 'file-saver'

export async function exportData(
  posts: Post[],
  userInfo?: UserInfo | null,
  followings?: UserBio[],
) {
  if (!userInfo?.name) {
    window.$message.warning('没有数据可以导出')
    return false
  }

  const { name } = userInfo

  try {
    const data = {
      weibo: posts,
      user: userInfo || {},
      followings: followings || [],
    }

    const dataStr = JSON.stringify(data)
    const imgsData = Array
      .from(imgsParser(posts))
      .join(',\n') // csv 格式

    window.$message.success('导出成功，正在下载数据...请允许浏览器批量下载文件', {
      duration: 5000,
    })

    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    fileSaver.saveAs(dataBlob, `weibo-data-${name}.json`)

    if (imgsData.length) {
      const imgsDataBlob = new Blob([imgsData], { type: 'text/csv' })
      fileSaver.saveAs(imgsDataBlob, `imgs-${name}.csv`)
    }
  }
  catch (err) {
    window.$message.error('导出失败')
    console.error('导出失败', err)
    return false
  }
  return true
}
