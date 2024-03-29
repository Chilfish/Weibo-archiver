import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import type { Post, UID, UserInfo } from '@types'
import { EmptyIDB, IDB } from '../utils/storage'

export const usePostStore = defineStore('post', () => {
  const publicStore = usePublicStore()

  const idb = ref(new EmptyIDB())
  watchImmediate(() => publicStore.curUid, async (uid) => {
    if (!uid)
      return

    const wrappedUid = `uid-${uid}` as UID
    console.log('Change db', wrappedUid)

    idb.value = new IDB(wrappedUid)
    await updateTotal()
  })

  const route = useRoute()
  const router = useRouter()

  const curPage = computed({
    get: () => Number(route.query.page) || 1,
    set: (val: number) => router.push({
      query: {
        ...route.query,
        page: val,
      },
    }),
  })

  const pageSize = computed({
    get: () => Number(route.query.pageSize) || 10,
    set: (val: number) => router.push({
      query: {
        ...route.query,
        pageSize: val,
      },
    }),
  })

  const seachFn = ref<(text: string) => number[]>()

  /* 该结果的总帖子数 */
  const total = ref(0)

  /* DB 中的帖子总数 */
  const totalDB = ref(0)

  /** 当前筛出来微博的总页数 */
  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

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
    user: UserInfo,
    isReplace = false,
  ) {
    await waitIDB()

    const { count, search } = await idb.value.addDBPosts(data, isReplace)
    totalDB.value = count
    total.value = count
    seachFn.value = search

    await idb.value.setUserInfo(user)
  }

  async function _searchPost(
    query: string,
  ) {
    await waitIDB()

    if (!seachFn.value) {
      const posts = await idb.value.getAllDBPosts()
      const { search } = idb.value.buildSearch(posts)
      seachFn.value = search
    }

    const result = seachFn.value(query)

    const count = result.length
    total.value = count
    return result
  }

  async function searchPost(
    query: string,
    page: number,
  ) {
    const p = page || curPage.value

    const result = await _searchPost(query)

    const start = (p - 1) * pageSize.value
    const end = start + pageSize.value
    return result.slice(start, end)
  }

  async function get(page?: number) {
    const p = page || curPage.value

    const path = route.path
    const query = route.query.q as string

    let result: Post[] = []

    await waitIDB()

    if (path === '/post') {
      result = await idb.value.getDBPosts(p, pageSize.value)
      total.value = totalDB.value
    }
    else {
      const _result = await searchPost(query, p)

      result = await idb.value.getDBPostByTime(_result)
    }

    return result
  }

  async function _getByTime(
    start: number,
    end: number,
    page?: number,
  ) {
    await waitIDB()

    const p = page || curPage.value

    const { posts, count } = await idb.value.filterByTime(start, end, p, pageSize.value)
    total.value = count
    return posts
  }

  async function searchAndTime(
    query: string,
    start: number,
    end: number,
    page?: number,
  ) {
    await waitIDB()

    const p = page || curPage.value

    const result = await _searchPost(query)
      .then(posts => posts.filter(time => time >= start && time <= end))

    total.value = result.length

    const startIdx = (p - 1) * pageSize.value
    const endIdx = startIdx + pageSize.value
    const sliced = result.slice(startIdx, endIdx)

    const posts = await idb.value.getDBPostByTime(sliced)
    return posts
  }

  async function updateTotal() {
    await waitIDB()

    total.value = await idb.value.getPostCount()
    totalDB.value = total.value
  }

  async function getByTime(_page: number, start: number, end: number) {
    const p = _page || curPage.value
    const query = route.query.q as string

    let posts: Post[] = []
    if (route.path === '/post')
      posts = await _getByTime(start, end, _page)

    else
      posts = await searchAndTime(query, start, end, p)

    return posts
  }

  return {
    total,
    totalDB,
    pages,
    pageSize,
    curPage,

    get,
    set,

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

    init: () => Promise.all([
      updateTotal(),
    ]),
    updateTotal,
    getByTime,
    searchPost,
    searchAndTime,
  }
})
