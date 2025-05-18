import type {
  Favorite,
  Following,
  Post,
  UserInfo,
} from '@weibo-archiver/core'
import type { FetchProgress } from '../types'
import { exportData, idb } from '@weibo-archiver/core'
import { computed, reactive, toRaw } from 'vue'
import { config, useConfig } from './useConfig'
import { userService } from './useFetch'

const { updateConfig } = useConfig()

export const postState = reactive({
  pageSize: 20,
})

// Export progress for use in other components
export const progress = computed<FetchProgress>(() => ({
  percentage: (config.value.fetchedCount / config.value.total) * 100 || 0,
  fetchedCount: config.value.fetchedCount,
}))

export function usePost() {
  async function initializeDB() {
    if (!config.value.user) {
      return
    }

    await idb.setCurUser(config.value.user?.uid || '0')
    if (!idb.curUser) {
      await idb.addUser(toRaw(config.value.user))
    }
    console.log('DB initialized', idb.curUser, config.value)
  }

  async function resetState() {
    postState.pageSize = 20
    updateConfig({
      curPage: 0,
      fetchedCount: 0,
      total: 0,
    })
  }

  async function addPosts(newPosts: Post[]) {
    try {
      await idb.addPosts(newPosts)
      updateConfig({
        fetchedCount: config.value.fetchedCount + newPosts.length,
        curPage: Math.ceil((config.value.fetchedCount + 1) / 20),
      })
    }
    catch (error) {
      console.error('Failed to add post:', error)
      throw new Error('Failed to add post to database')
    }
  }

  async function getAllPosts() {
    return await idb.getAllPosts()
  }

  async function updatePostCount() {
    const count = await idb.getAllPostsCount()
    updateConfig({ fetchedCount: count })
  }

  async function addUser(user: UserInfo) {
    userService.uid = user.uid
    await idb.addUser(toRaw(user))
    await idb.setCurUser(user.uid)
  }

  async function addFollowingUsers(followings: Following[]) {
    await idb.addFollowings(followings)
  }

  async function addFavorites(favorites: Favorite[]) {
    await idb.addFavorites(favorites)
  }

  async function exportAllData() {
    try {
      const posts = await getAllPosts()

      const followings = config.value.weiboOnly
        ? []
        : await idb.getFollowings()

      const favorites = await idb.getAllFavorites()

      await exportData(posts, config.value.user, followings, favorites)
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
    addPosts,
    resetState,
    getAllPosts,
    updatePostCount,
    addUser,
    exportAllData,
    addFollowingUsers,
    addFavorites,
  }
}
