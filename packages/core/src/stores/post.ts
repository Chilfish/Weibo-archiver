import type { Album, Post, UID, UserBio, UserInfo } from '@weibo-archiver/core'
import { watchImmediate } from '@vueuse/core'
import { EmptyIDB, IDB } from '@weibo-archiver/core'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { usePublicStore } from './public'

export const usePostStore = defineStore('post-v1', () => {
  const publicStore = usePublicStore()
  const followings = shallowRef<UserBio[]>([])
  const allImages: Album[] = []
  const weiboArr = ref<Post[]>([])
  const loading = ref(false)

  const idb = ref<IDB>(new EmptyIDB())
  watchImmediate(() => publicStore.curUid, async (uid) => {
    if (!uid)
      return

    const wrappedUid = `uid-${uid}` as UID
    console.log('Change db', wrappedUid)

    idb.value = new IDB()
    await updateTotal()

    followings.value = await getFollowings()
  })

  const route = useRoute()

  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10)

  const searchFn = ref<(text: string) => number[]>()

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
   * @param user
   * @param _followings
   * @param isReplace
   */
  async function set(
    data: Post[],
    user: UserInfo,
    _followings?: UserBio[],
    isReplace = false,
  ) {
    loading.value = true
    await waitIDB()

    if (_followings && _followings.length) {
      await idb.value.clearFollowings()
      followings.value = _followings
      await idb.value.addFollowings(_followings)
    }

    const { count, search } = await idb.value.addDBPosts(data, isReplace)
    totalDB.value = count
    total.value = count
    searchFn.value = search

    await idb.value.setUserInfo(user)
    await updateTotal()
    await get(curPage.value)
    loading.value = false
  }

  async function _searchPost(
    query: string,
  ) {
    await waitIDB()

    if (!searchFn.value) {
      const posts = await idb.value.getAllDBPosts()
      const { search } = idb.value.buildSearch(posts)
      searchFn.value = search
    }

    const result = searchFn.value(query)

    total.value = result.length
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

    let result: Post[]

    // await waitIDB()

    if (path === '/post') {
      result = await idb.value.getDBPosts(p, pageSize.value)
      total.value = totalDB.value
    }
    else {
      const _result = await searchPost(query, p)

      result = await idb.value.getDBPostByTime(_result)
    }

    weiboArr.value = result
    return result
  }

  async function _getByTime(
    start: number,
    end: number,
    page?: number,
  ) {
    await waitIDB()

    const p = page || curPage.value

    const {
      posts,
      count,
    } = await idb.value.filterByTime(start, end, p, pageSize.value)
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

    return await idb.value.getDBPostByTime(sliced)
  }

  async function updateTotal() {
    await waitIDB()

    total.value = await idb.value.getPostCount()
    totalDB.value = total.value
  }

  async function getByTime(_page: number, start: number, end: number) {
    const p = _page || curPage.value
    const query = route.query.q as string

    let posts: Post[]
    if (route.path === '/post')
      posts = await _getByTime(start, end, _page)

    else
      posts = await searchAndTime(query, start, end, p)

    weiboArr.value = posts
    return posts
  }

  async function getById(id: string) {
    await waitIDB()
    return await idb.value.getDBPostById(id)
  }

  async function getFollowings() {
    await waitIDB()
    return await idb.value
      .getFollowings()
      .then(data => data.sort((a, b) => a.name.localeCompare(b.name)))
  }

  /**
   * 获取所有图片，以月份分组
   */
  async function getAllImgs() {
    if (allImages.length > 0)
      return allImages

    await waitIDB()
    const imgs = await idb.value.getImgs()

    // console.log('Get imgs', imgs)

    const result: Album[] = []

    for (const { img, date, id } of imgs) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}年${month.toString().padStart(2, '0')}月`

      const data = { url: img, id, date: key }
      result.push(data)
    }
    allImages.push(...result)

    return result
  }

  return {
    total,
    totalDB,
    pages,
    pageSize,
    curPage,
    loading,
    weiboArr,
    followings,

    get,
    set,

    clearDB: async () => {
      loading.value = true
      await idb.value.clearDB()
      publicStore.rmUser()
      weiboArr.value = []
      loading.value = false
    },
    getAll: async () => {
      await waitIDB()
      return idb.value.getAllDBPosts()
    },
    getSize: async () => {
      await waitIDB()
      return idb.value.getPostCount()
    },

    init: async () => {
      await updateTotal()
      await get(curPage.value)
      loading.value = false
    },
    updateTotal,
    getByTime,
    searchPost,
    searchAndTime,
    getFollowings,
    getAllImgs,
    getById,
  }
})
