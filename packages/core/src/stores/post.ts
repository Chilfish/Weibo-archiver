import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { Post } from '@types'
import {
  addDBPosts,
  clearDB,
  getAllDBPosts,
  getDBPosts,
  getPostCount,
  getSize,
  searchPost,
} from '../utils/storage'

export const usePostStore = defineStore('post', () => {
  const route = useRoute()

  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10)

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

    total.value = await addDBPosts(data, isReplace)
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
      result = posts
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
