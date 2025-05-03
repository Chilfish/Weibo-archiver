import type { Post, UID, UserBio } from '@weibo-archiver/core'
import type { FetchProgress } from '../types'
import { exportData } from '@core/utils'
import { EmptyIDB, IDB } from '@core/utils/storage'
import { computed, reactive, toRaw } from 'vue'
import { config, useConfig } from './useConfig'
import { userService } from './useFetch'

const { updateConfig } = useConfig()

export const postState = reactive({
  pageSize: 20,
  idb: new EmptyIDB() as IDB,
})

// Export progress for use in other components
export const progress = computed<FetchProgress>(() => ({
  percentage: (config.value.fetchedCount / config.value.total) * 100 || 0,
  fetchedCount: config.value.fetchedCount,
}))

export function usePost() {
  async function initializeDB() {
    const wrappedUid = `uid-${config.value.user?.uid || ''}` as UID
    if (postState.idb.name === wrappedUid)
      return

    postState.idb = new IDB(wrappedUid)
    await postState.idb.clearFollowings()
    await waitForDBInitialization()
    console.log('DB initialized', postState.idb, config.value)
  }

  async function waitForDBInitialization() {
    const dbName = `uid-${config.value.user?.uid || ''}`
    while (postState.idb.name !== dbName) {
      await new Promise(r => setTimeout(r, 300))
    }
  }

  async function resetState() {
    postState.pageSize = 20
    updateConfig({
      curPage: 0,
      fetchedCount: 0,
      total: 0,
    })

    await initializeDB()
    await postState.idb.clearDB()
  }

  async function addPost(newPost: Post) {
    try {
      await postState.idb.addDBPost(newPost)
      updateConfig({
        fetchedCount: config.value.fetchedCount + 1,
        curPage: Math.ceil((config.value.fetchedCount + 1) / 20),
      })
    }
    catch (error) {
      console.error('Failed to add post:', error)
      throw new Error('Failed to add post to database')
    }
  }

  async function getAllPosts() {
    return await postState.idb.getAllDBPosts()
  }

  async function updatePostCount() {
    const count = await postState.idb.getPostCount()
    updateConfig({ fetchedCount: count })
  }

  async function updateUserInfo() {
    const user = config.value.user
    if (!user)
      return
    userService.uid = user.uid
    await postState.idb.setUserInfo(toRaw(user))
  }

  async function addFollowingUsers(followings: UserBio[]) {
    await postState.idb.addFollowings(followings)
  }

  async function exportFollowingUsers() {
    const data = await postState.idb.getFollowings()
    return await exportData([], config.value.user, data)
  }

  async function exportAllData() {
    try {
      const posts = await getAllPosts()

      const followings = config.value.weiboOnly
        ? []
        : await postState.idb.getFollowings()

      await exportData(posts, config.value.user, followings)
    }
    catch (error) {
      console.error('Failed to export data:', error)
      throw new Error('Failed to export data')
    }
  }

  return {
    progress,
    state: postState,

    initializeDB,
    addPost,
    resetState,
    getAllPosts,
    updatePostCount,
    updateUserInfo,
    exportAllData,
    addFollowingUsers,
    exportFollowingUsers,
  }
}
