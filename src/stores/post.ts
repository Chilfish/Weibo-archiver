import { defineStore } from 'pinia'
import type { Post } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])
  const curPage = ref(1)
  const viewedPage = ref(1)
  const total = ref(0)

  const pages = computed(() => {
    return Math.ceil(total.value / 20)
  })

  function setPage(val: number) {
    viewedPage.value = Math.max(val, viewedPage.value)
    curPage.value = val
  }

  function setTotal(num: number) {
    total.value = num
  }

  function add(newPosts: Post[]) {
    posts.value = [...posts.value, ...newPosts]
  }

  function get(page?: number): Post[] {
    let p = page
    if (!p)
      p = curPage.value

    return posts.value.slice((p - 1) * 20, p * 20)
  }

  return {
    posts,
    total,
    pages,
    curPage,
    viewedPage,
    setPage,
    add,
    setTotal,
    get,
  }
})
