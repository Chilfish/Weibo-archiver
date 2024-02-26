import { defineStore } from 'pinia'
import type { Post } from '@types'

export const usePostStore = defineStore('post', () => {
  // 获取到的所有帖子
  const posts = ref([] as Post[])

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

  return {
    posts,
    total,
    pages,
    postsPerPage,
    fetchedPage,

    add,
    getById,
    reset,
  }
})
