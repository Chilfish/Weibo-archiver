import type {
  Favorite,
  Following,
  Post,
  UserInfo,
} from '@weibo-archiver/core'
import { exportData, idb } from '@weibo-archiver/core'
import { toRaw } from 'vue'
import { config, useConfig } from './useConfig'
import { fetchCount, userService } from './useFetch'

const { updateConfig } = useConfig()

export function usePost() {
  async function initializeDB() {
    if (!config.value.user) {
      return
    }

    await idb.setCurUser(config.value.user?.uid || '0')
    if (!idb.curUser) {
      await idb.addUser(toRaw(config.value.user))
    }

    fetchCount.value = {
      posts: await idb.getAllPostsCount(),
      favorites: await idb.getAllFavoritesCount(),
      followings: await idb.getAllFollowingsCount(),
    }

    console.log('DB initialized', idb.curUser, config.value)
  }

  async function resetState() {
    await idb.clearDB()
    fetchCount.value = {
      posts: 0,
      favorites: 0,
      followings: 0,
    }
    updateConfig({
      curPage: 0,
    })
  }

  async function addPosts(newPosts: Post[]) {
    try {
      await idb.addPosts(newPosts)
      fetchCount.value.posts += newPosts.length
      updateConfig({
        curPage: Math.ceil((fetchCount.value.posts + 1) / 20),
      })
    }
    catch (error) {
      console.error('Failed to add post:', error)
      throw new Error('Failed to add post to database')
    }
  }

  async function getLastPost() {
    return idb.getLatestPost()
  }

  async function getAllPosts() {
    return await idb.getAllPosts()
  }

  async function addUser(user: UserInfo) {
    userService.uid = user.uid
    await idb.addUser(toRaw(user))
    await idb.setCurUser(user.uid)
  }

  async function addFollowingUsers(followings: Following[]) {
    fetchCount.value.followings = followings.length
    await idb.addFollowings(followings)
  }

  async function addFavorites(favorites: Favorite[]) {
    fetchCount.value.favorites = favorites.length
    await idb.addFavorites(favorites)
  }

  async function exportAllData() {
    try {
      const { hasFavorites, hasFollowings, hasWeibo } = config.value

      const posts = hasWeibo ? await idb.getAllPosts() : []
      const followings = hasFollowings ? await idb.getFollowings() : []
      const favorites = hasFavorites ? await idb.getAllFavorites() : []

      await exportData({
        posts,
        favorites,
        followings,
        user: idb.curUser,
      })
    }
    catch (error) {
      console.error('Failed to export data:', error)
      throw new Error('Failed to export data')
    }
  }

  return {
    initializeDB,
    addPosts,
    resetState,
    getAllPosts,
    getLastPost,
    addUser,
    exportAllData,
    addFollowingUsers,
    addFavorites,
  }
}
