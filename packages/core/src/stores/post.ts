import { defineStore } from 'pinia'
import type { Post } from '@core/types'
import { _ as _posts } from './data'

export const usePostStore = defineStore('post', () => {
  // 必须是外部导入优先, 这样才能在 build 中直接引用
  const posts = ref(_posts as unknown as Post[])
  // 用于导出图片链接
  const imgs = ref(new Set<string>())

  const viewImg = ref(imgViewSrc)

  const curPage = ref(1)
  const postsPerPage = ref(20) // 每页显示的帖子数量 ppp
  const fetchedPage = ref(Math.round(posts.value.length / postsPerPage.value))
  const total = ref(posts.value.length)

  const pages = computed(() => {
    return Math.ceil(total.value / postsPerPage.value)
  })

  function setCurPage(val: number) {
    curPage.value = val
  }

  function setTotal(num: number) {
    total.value = num
  }

  function add(newPosts: Post[]) {
    postsPerPage.value = newPosts.length
    posts.value = [...posts.value, ...newPosts]
    fetchedPage.value++
  }

  function get(page?: number): Post[] {
    let p = page
    if (!p)
      p = curPage.value

    return posts.value.slice((p - 1) * postsPerPage.value, p * postsPerPage.value)
  }

  function addImgs(newImgs: Set<string> | (string | null | undefined)[]) {
    newImgs.forEach((img) => {
      if (img)
        imgs.value.add(img)
    })
  }

  /**
   * 全局弹窗预览图片
   */
  function setViewImg(img: string) {
    viewImg.value = replaceImg(img)
  }

  return {
    posts,
    imgs,
    viewImg,
    total,
    pages,
    postsPerPage,
    curPage,
    fetchedPage,
    setCurPage,
    add,
    addImgs,
    setTotal,
    get,
    setViewImg,
  }
})
