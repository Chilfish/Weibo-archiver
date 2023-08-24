import { defineStore } from 'pinia'
import { _imgs, _posts } from './data'
import type { Post } from '~/types'

export const usePostStore = defineStore('post', () => {
  const posts = ref(_posts as unknown as Post[])
  const imgs = ref(new Set(_imgs as unknown as string[]))

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

  function addImgs(newImgs: Set<string> | string[]) {
    imgs.value = new Set([...imgs.value, ...newImgs])
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
