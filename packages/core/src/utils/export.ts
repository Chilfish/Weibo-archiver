import fileSaver from 'file-saver'
import type { Post, UserInfo } from '@types'
import { imgsParser } from './parse'

export async function exportData(
  posts: Post[],
  userInfo?: UserInfo | null,
) {
  if (!posts[0] || !userInfo?.name) {
    window.$message.warning('没有数据可以导出')
    return false
  }

  const { name } = userInfo

  try {
    const data = {
      user: userInfo,
      weibo: posts,
    }

    const dataStr = JSON.stringify(data)
    const imgsData = Array
      .from(imgsParser(posts))
      .join(',\n') // csv 格式

    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const imgsDataBlob = new Blob([imgsData], { type: 'text/csv' })

    window.$message.success('导出成功，正在下载数据...请允许浏览器批量下载文件', {
      duration: 5000,
    })

    fileSaver.saveAs(dataBlob, `weibo-data-${name}.json`)
    fileSaver.saveAs(imgsDataBlob, `imgs-${name}.csv`)
  }
  catch (err) {
    window.$message.error('导出失败')
    console.error('导出失败', err)
    return false
  }
  return true
}
