import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { Post, UID } from '@types'
import { EmptyIDB, IDB, type SaerchResult } from '../utils/storage'

export const usePostStore = defineStore('post', () => {
  const publicStore = usePublicStore()

  const idb = ref(new EmptyIDB())
  watchImmediate(() => publicStore.curUid, async (uid) => {
    if (!uid)
      return

    let version = (await idb.value.idb).version
    const wrappedUid = `uid-${uid}` as UID

    const isEsixt = await idb.value.exists(wrappedUid)
    if (!isEsixt)
      version += 1
    console.log('init db', wrappedUid, version)

    idb.value = new IDB(wrappedUid, version)
  })

  const route = useRoute()

  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10)

  const seachFn = ref<(text: string) => SaerchResult>()

  // 该结果的总帖子数
  const total = ref(0)

  // DB 中的帖子总数
  const totalDB = ref(0)

  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  function reset() {
    curPage.value = 1
    pageSize.value = 20
  }

  /**
   * 等待 IDB 初始化完成
   */
  async function waitIDB() {
    const dbName = `uid-${publicStore.curUid}`

    while (idb.value.name !== dbName)
      await new Promise(r => setTimeout(r, 300))
  }

  /**
   * 设置帖子数据，可选择是否替换或是追加合并
   * @param data
   * @param replace
   */
  async function set(
    data: Post[],
    isReplace = false,
  ) {
    if (!data[0]?.user)
      throw new Error('数据格式错误，可能要重新导入')

    await waitIDB()

    const { count, search } = await idb.value.addDBPosts(data, isReplace)
    totalDB.value = count
    total.value = count
    seachFn.value = search
  }

  async function searchPost(
    query: string,
    page: number,
    pageSize: number,
  ) {
    await waitIDB()

    if (!seachFn.value) {
      const posts = await idb.value.getAllDBPosts()
      const { search } = idb.value.buildSearch(posts)
      seachFn.value = search
    }

    const result = seachFn.value(query)
      .map(r => r.item)
      .sort((a, b) => b.time - a.time)

    const count = result.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const posts = result.slice(start, end)

    return { posts, count }
  }

  async function get(page?: number) {
    const p = page || curPage.value

    const path = route.path
    const query = route.query.q as string

    let result: Post[] = []

    await waitIDB()

    if (path === '/post') {
      result = await idb.value.getDBPosts(p, pageSize.value)
    }
    else {
      const { posts, count } = await searchPost(query, p, pageSize.value)

      result = await idb.value.getDBPost(posts.map(p => p.time))
      total.value = count
    }

    return result
  }

  async function updateTotal() {
    await waitIDB()

    total.value = await idb.value.getPostCount()
    totalDB.value = total.value
  }

  return {
    total,
    totalDB,
    pages,
    pageSize,
    curPage,

    get,
    set,
    reset,

    clearDB: async () => {
      await waitIDB()
      idb.value.clearDB()
    },
    getAll: async () => {
      await waitIDB()
      return idb.value.getAllDBPosts()
    },
    getSize: async () => {
      await waitIDB()
      return idb.value.getPostCount()
    },
    updateTotal,
  }
})
