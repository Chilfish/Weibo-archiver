import { defineStore } from 'pinia'
import type { Post } from '@core/types'
import { _ as _posts } from './data.mjs'

export const usePostStore = defineStore('post', () => {
  // 必须是外部导入优先, 这样才能在 build 中直接引用
  const posts = ref((
    _posts as unknown as Post[])
    .sort((a, b) => Number(b.id) - Number(a.id)), // 按 id 也就是发布时间降序排列
  )
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

  const dateRange = ref([new Date(), new Date()])

  function reset() {
    posts.value = []
    imgs.value = new Set<string>()
    viewImg.value = imgViewSrc
    curPage.value = 1
    postsPerPage.value = 20
    fetchedPage.value = 0
    total.value = 0
    dateRange.value = [new Date(), new Date()]
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

  return {
    posts,
    imgs,
    viewImg,
    total,
    pages,
    dateRange,
    postsPerPage,
    curPage,
    fetchedPage,

    add,
    addImgs,
    get,
    reset,
  }
})
