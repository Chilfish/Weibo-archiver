import { defineStore, storeToRefs } from 'pinia'
import type { Post, UID, UserInfo } from '@types'
import { EmptyIDB, IDB } from '@core/utils/storage'
import { useConfigStore } from './configStore'

export const usePostStore = defineStore('post', () => {
  /* 获取到的所有帖子，但会卡内存 */
  // const posts = shallowRef([] as Post[])

  const userInfo = ref<UserInfo | null>(null)

  const configStore = useConfigStore()
  const { config } = storeToRefs(configStore)

  /* 每页的帖子数量 */
  const pageSize = ref(20)

  /* 总帖子数 */
  const total = ref(0)

  const idb = ref<IDB>(new EmptyIDB())

  function setDB() {
    const wrappedUid = `uid-${config.value.uid}` as UID
    if (idb.value.name === wrappedUid)
      return
    idb.value = new IDB(wrappedUid)
  }

  /**
   * 等待 IDB 初始化完成
   */
  async function waitIDB() {
    const dbName = `uid-${config.value.uid}`

    while (idb.value.name !== dbName)
      await new Promise(r => setTimeout(r, 300))
  }

  /**
   * 重置 fetch 状态
   */
  async function reset() {
    total.value = 0
    pageSize.value = 20
    configStore.setConfig({
      curPage: 0,
      fetchedCount: 0,
    })

    setDB()
    await idb.value.clearDB()
  }

  /**
   * 添加帖子
   */
  async function add(newPost: Post) {
    await waitIDB()
    await idb.value.addDBPost(newPost)
    config.value.fetchedCount += 1

    config.value.curPage = Math.ceil(config.value.fetchedCount / 20)
  }

  async function getAll() {
    await waitIDB()
    const posts = await idb.value.getAllDBPosts()
    return posts
  }

  async function setCount() {
    await waitIDB()
    const count = await idb.value.getPostCount()
    configStore.setConfig({ fetchedCount: count })
  }

  async function setUser() {
    if (!userInfo.value)
      return
    await waitIDB()

    const user = toRaw(userInfo.value)
    await idb.value.setUserInfo(user)
  }

  return {
    total,
    pageSize,
    userInfo,

    setDB,
    add,
    reset,
    getAll,
    setCount,
    setUser,
  }
})
