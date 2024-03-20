import { defineStore } from 'pinia'
import type { Post } from '@types'

export const usePostStore = defineStore('post', () => {
  /* 获取到的所有帖子 */
  const posts = shallowRef([] as Post[])

  /* 已获取的页数 */
  const fetchedPage = ref(0)
  /* 每页的帖子数量 */
  const pageSize = ref(20)

  /* 总帖子数 */
  const total = ref(0)
  /* 总页数 */
  const pages = computed(() => Math.ceil(total.value / pageSize.value))

  /**
   * 重置
   */
  function reset() {
    posts.value = []
    total.value = 0
    pageSize.value = 20
    fetchedPage.value = 0
  }

  /**
   * 添加帖子
   */
  function add(newPosts: Post[]) {
    // pageSize.value = newPosts.length
    posts.value = [...posts.value, ...newPosts]
    triggerRef(posts)
    fetchedPage.value++
    pageSize.value = (newPosts.length || 20)
  }

  return {
    posts,
    total,
    pages,
    pageSize,
    fetchedPage,

    add,
    reset,
  }
})
