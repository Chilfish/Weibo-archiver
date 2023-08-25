import { defineStore } from 'pinia'
import type { Post } from '@core/types'
import { _ as _posts } from './data'

export const usePostStore = defineStore('post', () => {
  // 必须是外部导入优先, 这样才能在 build 中直接引用
  const posts = ref(_posts as unknown as Post[])
  // 用于导出图片链接
  const imgs = ref(new Set<string>())

  const curPage = ref(1)
  const fetchedPage = ref(Math.round(posts.value.length / 20))
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
