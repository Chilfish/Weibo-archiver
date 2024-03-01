import { defineStore } from 'pinia'
import type { Post } from '@types'

export const usePostStore = defineStore('post', () => {
  const posts = ref([] as Post[])
  const resultPosts = ref([] as Post[])

  const url = document.location
  const _pageSize = Number(new URLSearchParams(url.search).get('pageSize')) || 20
  const _curPage = Number(url.pathname.split('/').pop())

  const viewImg = ref(imgViewSrc)

  const curPage = ref(_curPage || 1)
  const pageSize = ref(_pageSize || 20) // 每页显示的帖子数量 ppp

  // 总帖子数
  const total = ref(posts.value.length)

  // 监听搜索结果, 更新总帖子数
  watch(resultPosts, () => {
    total.value = resultPosts.value.length === 0
      ? posts.value.length
      : resultPosts.value.length
  })

  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  function reset() {
    posts.value = []
    resultPosts.value = []
    viewImg.value = imgViewSrc
    curPage.value = 1
    pageSize.value = 20
  }

  /**
   * 设置帖子数据，可选择是否替换或是追加合并
   * @param data
   * @param replace
   */
  function set(
    data: Post[],
    replace = false,
  ) {
    if (!data[0]?.user)
      throw new Error('数据格式错误')

    if (replace) {
      posts.value = data
    }
    else {
      posts.value = posts.value.concat(data)
      posts.value = Array.from(new Set(posts.value))
    }

    total.value = data.length
  }

  function get(page?: number): Post[] {
    let p = page
    if (!p)
      p = curPage.value
    const sliceDis = [(p - 1) * pageSize.value, p * pageSize.value]

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
    pageSize,
    curPage,

    get,
    set,
    getById,
    reset,

    searchText,
  }
})
