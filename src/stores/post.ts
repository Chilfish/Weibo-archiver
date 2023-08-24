import { defineStore } from 'pinia'
import { posts as data } from './data'
import type { Post } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref(data as unknown as Post[])
  const imgs = ref([] as string[])

  const curPage = ref(1)
  const fetchedPage = ref(posts.value.length / 20)
  const total = ref(posts.value.length)

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

  function addImgs(newImgs: string[]) {
    imgs.value = [...imgs.value, ...newImgs]
  }

  return {
    posts,
    imgs,
    total,
    pages,
    curPage,
    fetchedPage,
    setCurPage,
    add,
    addImgs,
    setTotal,
    get,
  }
})
