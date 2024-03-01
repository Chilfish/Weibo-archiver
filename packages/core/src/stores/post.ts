import { defineStore } from 'pinia'
import type { Post } from '@types'
import { getMany, set as setDB, setMany } from 'idb-keyval'

export const usePostStore = defineStore('post', () => {
  const ids = ref([] as string[])

  const resultPosts = ref([] as Post[])

  const url = document.location
  const _pageSize = Number(new URLSearchParams(url.search).get('pageSize')) || 20
  const _curPage = Number(url.pathname.split('/').pop())

  const viewImg = ref(imgViewSrc)

  const curPage = ref(_curPage || 1)
  const pageSize = ref(_pageSize || 20) // 每页显示的帖子数量 ppp

  // 总帖子数
  const total = ref(ids.value.length)

  // 监听搜索结果, 更新总帖子数
  watch(resultPosts, () => {
    total.value = resultPosts.value.length === 0
      ? ids.value.length
      : resultPosts.value.length
  })

  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  function reset() {
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
  async function set(
    data: Post[],
    replace = false,
  ) {
    if (!data[0]?.user)
      throw new Error('数据格式错误，可能要重新导入')

    let posts = data
    if (!replace)
      posts = Array.from(new Set(posts.concat(data)))

    const _ids = posts.map(post => `post-${post.mblogid}`)
    ids.value = _ids

    await setDB('ids', _ids)
    await setMany(posts.map(post => [`post-${post.mblogid}`, post]))

    total.value = data.length
  }

  async function get(page?: number) {
    let p = page
    if (!p)
      p = curPage.value
    const sliceDis = [(p - 1) * pageSize.value, p * pageSize.value]

    return await getMany<Post>(ids.value.slice(...sliceDis))
  }

  // TODO: 优化
  async function searchText(p: string): Promise<Post[]> {
    const posts = await getMany<Post>(ids.value)

    const res = posts.filter((post) => {
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
    ids,
    resultPosts,
    viewImg,
    total,
    pages,
    pageSize,
    curPage,

    get,
    set,
    reset,

    searchText,
  }
})
