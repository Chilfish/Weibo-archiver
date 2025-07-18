import type { ImportedData } from '@weibo-archiver/core'
import { idb } from '@weibo-archiver/core'

interface DataFromExt {
  [uid: string]: ImportedData
}

window.addEventListener<any>('importFromExt', async (e: CustomEvent) => {
  const data = e.detail as DataFromExt
  if (!data || Object.keys(data).length === 0) {
    console.warn('No data received from extension')
    return
  }

  console.log('Data received from extension:', data)

  const userIds = Object.keys(data)
  for (const userId of userIds) {
    const userData = data[userId]
    if (!userData || !userData.weibo || userData.weibo.length === 0) {
      console.warn(`No posts found for user ID: ${userId}`)
      continue
    }

    console.log(`Saving posts for user ID: ${userId}`, userData.user)

    await idb.addUser(userData.user)
    await idb.setCurUser(userId)

    await idb.addPosts(userData.weibo)
    await idb.addFollowings(userData.followings)
    await idb.addFavorites(userData.favorites)
  }
})
