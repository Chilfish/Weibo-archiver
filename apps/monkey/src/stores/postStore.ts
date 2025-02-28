import type { Post, UID, UserBio, UserInfo } from '@shared'
import type { FetchProgress } from '../types'
import { exportData } from '@core/utils'
import { EmptyIDB, IDB } from '@core/utils/storage'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref, toRaw } from 'vue'
import { useConfigStore } from './configStore'

export const usePostStore = defineStore('post', () => {
  const userInfo = ref<UserInfo | null>(null)
  const configStore = useConfigStore()
  const { config } = storeToRefs(configStore)

  const state = reactive({
    pageSize: 20,
    total: 0,
    idb: new EmptyIDB() as IDB,
  })

  const progress = computed<FetchProgress>(() => ({
    percentage: (config.value.fetchedCount / state.total) * 100 || 0,
    fetchedCount: config.value.fetchedCount,
    total: state.total,
  }))

  async function initializeDB() {
    const wrappedUid = `uid-${config.value.uid}` as UID
    if (state.idb.name === wrappedUid)
      return

    state.idb = new IDB(wrappedUid)
    await state.idb.clearFollowings()
    await waitForDBInitialization()
  }

  async function waitForDBInitialization() {
    const dbName = `uid-${config.value.uid}`
    while (state.idb.name !== dbName) {
      await new Promise(r => setTimeout(r, 300))
    }
  }

  async function resetState() {
    state.total = 0
    state.pageSize = 20
    configStore.updateConfig({
      curPage: 0,
      fetchedCount: 0,
    })

    await initializeDB()
    await state.idb.clearDB()
  }

  async function addPost(newPost: Post) {
    try {
      await state.idb.addDBPost(newPost)
      configStore.updateConfig({
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
    return await state.idb.getAllDBPosts()
  }

  async function updatePostCount() {
    const count = await state.idb.getPostCount()
    configStore.updateConfig({ fetchedCount: count })
  }

  async function updateUserInfo() {
    if (!userInfo.value)
      return
    await state.idb.setUserInfo(toRaw(userInfo.value))
  }

  async function addFollowingUsers(followings: UserBio[]) {
    await state.idb.addFollowings(followings)
  }

  async function exportFollowingUsers() {
    const data = await state.idb.getFollowings()
    return await exportData([], userInfo.value, data)
  }

  async function exportAllData() {
    try {
      const posts = await getAllPosts()
      console.log('Exporting posts count:', posts.length)

      const followings = config.value.weiboOnly
        ? []
        : await state.idb.getFollowings()

      await exportData(posts, userInfo.value, followings)
    }
    catch (error) {
      console.error('Failed to export data:', error)
      throw new Error('Failed to export data')
    }
  }

  return {
    userInfo,
    progress,
    state,

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
})
