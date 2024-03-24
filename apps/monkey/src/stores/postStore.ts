import { defineStore, storeToRefs } from 'pinia'
import type { Post, UID } from '@types'
import { EmptyIDB, IDB } from '@core/utils/storage'
import { useConfigStore } from './configStore'

export const usePostStore = defineStore('post', () => {
  /* 获取到的所有帖子，但会卡内存 */
  // const posts = shallowRef([] as Post[])

  const configStore = useConfigStore()
  const { config } = storeToRefs(configStore)

  /* 已获取的页数 */
  const fetchedPage = toRef(config.value.curPage)
  /* 已获取到的数量 */
  const fetchedCount = ref(config.value.fetchedCount)
  /* 每页的帖子数量 */
  const pageSize = ref(20)

  /* 总帖子数 */
  const total = ref(0)
  /* 总页数 */
  const pages = computed(() => Math.ceil(total.value / pageSize.value))

  const idb = ref<IDB>(new EmptyIDB())

  function setDB() {
    const wrappedUid = `uid-${config.value.uid}` as UID
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
   * 重置
   */
  async function reset() {
    total.value = 0
    pageSize.value = 20
    fetchedPage.value = 0
    fetchedCount.value = 0

    setDB()
    await waitIDB()
    await idb.value.clearDB()
  }

  /**
   * 添加帖子
   */
  async function add(newPosts: Post[], since_id: string) {
    await waitIDB()

    const { count } = await idb.value.addDBPosts(newPosts, false, false)
    fetchedCount.value = count
    fetchedPage.value++
    pageSize.value = (newPosts.length || 20)

    configStore.setConfig({
      since_id,
      curPage: fetchedPage.value,
      fetchedCount: fetchedCount.value,
    })
  }

  async function getAll() {
    await waitIDB()
    const posts = await idb.value.getAllDBPosts()
    return posts
  }

  return {
    total,
    pages,
    pageSize,
    fetchedPage,
    fetchedCount,

    setDB,
    add,
    reset,
    getAll,
  }
})
