import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { Post } from '@types'
import type { FuseResult } from 'fuse.js'
import {
  addDBPosts,
  buildSearch,
  clearDB,
  getAllDBPosts,
  getDBPost,
  getDBPosts,
  getPostCount,
  getSize,
} from '../utils/storage'

export const usePostStore = defineStore('post', () => {
  const route = useRoute()

  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10)

  const seachFn = ref<(text: string) => FuseResult<{
    time: number
    text: string
  }>[]>()

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

    const { count, search } = await addDBPosts(data, isReplace)
    totalDB.value = count
    seachFn.value = search
  }

  async function searchPost(
    query: string,
    page: number,
    pageSize: number,
  ) {
    if (!seachFn.value) {
      const posts = await getAllDBPosts()
      const { search } = buildSearch(posts)
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

    if (path === '/post') {
      result = await getDBPosts(p, pageSize.value)
    }
    else {
      const { posts, count } = await searchPost(query, p, pageSize.value)

      result = await getDBPost(posts.map(p => p.time))
      total.value = count
    }

    return result
  }

  async function updateTotal() {
    total.value = await getPostCount()
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

    clearDB,
    getAll: getAllDBPosts,
    updateTotal,
    getSize,
  }
})
