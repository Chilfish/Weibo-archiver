import { defineStore } from 'pinia'
import type { FetchOptions, Post } from '@types'

export const usePostStore = defineStore('post', () => {
  // 获取到的所有帖子
  const posts = ref([] as Post[])

  // 当前获取到的页数
  const curPage = ref(1)
  // 已获取的页数
  const fetchedPage = ref(0)
  // 每页显示的帖子数量 ppp
  const postsPerPage = ref(20)

  // 总帖子数
  const total = ref(posts.value.length)
  // 总页数
  const pages = computed(() => Math.ceil(total.value / postsPerPage.value))

  /**
   * 重置
   */
  function reset() {
    posts.value = []
    curPage.value = 1
    postsPerPage.value = 20
    fetchedPage.value = 0
  }

  /**
   * 添加帖子
   * @param newPosts
   */
  function add(newPosts: Post[]) {
    // postsPerPage.value = newPosts.length
    posts.value = [...posts.value, ...newPosts]
    fetchedPage.value++
  }

  function getById(id: number): Post[] {
    return posts.value.filter(post => post.id === id)
  }

  /**
   * 爬取微博
   */
  async function fetchPosts(
    fetchOptions: FetchOptions,
    isStop = ref(false),
    onEnd?: () => void,
  ) {
    const res = fetchOptions.isFetchAll
      ? await fetchAllPosts(fetchedPage.value + 1)
      : await fetchRangePosts(fetchedPage.value + 1)

    total.value = res?.total || 0
    add(res?.list || [])

    return await loopFetcher({
      start: fetchedPage.value,
      stopFn: () => posts.value.length >= total.value,
      onResult: res => add(res),
      onEnd: async () => {
        fetchedPage.value = pages.value
        onEnd?.()
      },
      isAbort: isStop,
      fetchFn: page => fetchOptions.isFetchAll
        ? fetchAllPosts(page)
        : fetchRangePosts(page),
    })
  }

  return {
    posts,
    total,
    pages,
    postsPerPage,
    curPage,
    fetchedPage,

    add,
    getById,
    reset,
    fetchPosts,
  }
})
