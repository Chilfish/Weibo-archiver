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
  ) {
    let page = fetchedPage.value + 1
    const res = fetchOptions.isFetchAll
      ? await fetchAllPosts(page)
      : await fetchRangePosts(page)

    // 先获取总页数
    total.value = res?.total || 0
    add(res?.list || [])

    const { startLoop, resume, pause } = usePausableLoop(
      async () => {
        page++
        const data = fetchOptions.isFetchAll
          ? await fetchAllPosts(page)
          : await fetchRangePosts(page)

        add(data?.list || [])
        console.log('page', page)

        // 如果已经获取到所有帖子
        if (fetchedPage.value >= pages.value)
          return { isStop: true }
        return { isStop: false }
      },
    )

    startLoop()

    return {
      pause,
      resume,
    }
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
