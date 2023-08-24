import { defineStore } from 'pinia'
import type { Post } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([])
  const curPage = ref(1)
  const fetchedPage = ref(0)
  const total = ref(0)

  const pages = computed(() => {
    return Math.ceil(total.value / 20)
  })

  function setCurPage(val: number) {
    curPage.value = val
  }

  function setTotal(num: number) {
    total.value = num
  }

  function add(newPosts: Post[]) {
    posts.value = [...posts.value, ...newPosts]
    fetchedPage.value++
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
    fetchedPage,
    setCurPage,
    add,
    setTotal,
    get,
  }
})
