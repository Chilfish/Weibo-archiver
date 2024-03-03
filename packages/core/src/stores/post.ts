import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { Post } from '@types'
import { getMany, set as setDB, setMany } from 'idb-keyval'

export const usePostStore = defineStore('post', () => {
  console.log('post pinia store created')

  const ids = ref([] as string[])

  const route = useRoute()

  const viewImg = ref(imgViewSrc)

  const curPage = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10) // 每页显示的帖子数量 ppp

  // 总帖子数
  const total = ref(ids.value.length)

  const pages = computed(() => {
    return Math.ceil(total.value / pageSize.value)
  })

  function reset() {
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

    await setDB('ids', _ids)
    await setMany(posts.map(post => [`post-${post.mblogid}`, post]))
    ids.value = _ids
    total.value = data.length
  }

  async function get(page?: number) {
    let p = page
    if (!p)
      p = curPage.value
    const sliceDis = [(p - 1) * pageSize.value, p * pageSize.value]

    const path = route.path
    const query = route.query.q as string

    if (path === '/post') {
      total.value = ids.value.length
      return await getMany<Post>(ids.value.slice(...sliceDis))
    }
    else {
      const data = await searchText(query)
      total.value = data.length
      return data.slice(...sliceDis)
    }
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

    return res
  }

  return {
    ids,
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
