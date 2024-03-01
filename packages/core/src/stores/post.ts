import { defineStore } from 'pinia'
import type { Post } from '@types'
import { _ as _posts } from '../constants/data.mjs'

export const usePostStore = defineStore('post', () => {
  // 必须是外部导入优先, 这样才能在 build 中直接引用
  const posts = ref((
    _posts as unknown as Post[])
    .sort((a, b) => Number(b.id) - Number(a.id)), // 按 id 也就是发布时间降序排列
  )

  const resultPosts = ref([] as Post[])

  const viewImg = ref(imgViewSrc)

  const curPage = ref(1)
  const postsPerPage = ref(20) // 每页显示的帖子数量 ppp

  // 总帖子数
  const total = ref(posts.value.length)

  // 监听搜索结果, 更新总帖子数
  watch(resultPosts, () => {
    total.value = resultPosts.value.length === 0
      ? posts.value.length
      : resultPosts.value.length
  })

  const pages = computed(() => {
    return Math.ceil(total.value / postsPerPage.value)
  })

  function reset() {
    posts.value = []
    resultPosts.value = []
    viewImg.value = imgViewSrc
    curPage.value = 1
    postsPerPage.value = 20
  }

  function set(data: Post[]) {
    posts.value = data
    total.value = data.length
    curPage.value = 1
  }

  function get(page?: number): Post[] {
    let p = page
    if (!p)
      p = curPage.value
    const sliceDis = [(p - 1) * postsPerPage.value, p * postsPerPage.value]

    return resultPosts.value.length === 0
      ? posts.value.slice(...sliceDis)
      : resultPosts.value.slice(...sliceDis)
  }

  function getById(id: number): Post[] {
    return posts.value.filter(post => post.id === id)
  }

  async function searchText(p: string): Promise<Post[]> {
    const res = posts.value.filter((post) => {
      const word = p.toLowerCase().trim().replace(/ /g, '')
      const regex = new RegExp(word, 'igm')
      return regex.test(post.text)
        || (post.card && regex.test(post.card?.title))
        || (post.retweeted_status && regex.test(post.retweeted_status?.text))
    })

    resultPosts.value = res
    return res
  }

  return {
    posts,
    resultPosts,
    viewImg,
    total,
    pages,
    postsPerPage,
    curPage,

    get,
    set,
    getById,
    reset,

    searchText,
  }
})
