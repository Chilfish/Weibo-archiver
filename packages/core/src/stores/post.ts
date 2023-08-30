import { defineStore } from 'pinia'
import type { LoopFetchParams, Post } from '../types'
import { _ as _posts } from '../static/data.mjs'
import { useUserStore } from './user'

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
  const fetchedPage = ref(Math.round(posts.value.length / postsPerPage.value))

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

  const dateRange = ref([new Date(), new Date()])

  const userStore = useUserStore()

  function reset() {
    posts.value = []
    resultPosts.value = []
    viewImg.value = imgViewSrc
    curPage.value = 1
    postsPerPage.value = 20
    fetchedPage.value = 0
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
    const sliceDis = [(p - 1) * postsPerPage.value, p * postsPerPage.value]

    return resultPosts.value.length === 0
      ? posts.value.slice(...sliceDis)
      : resultPosts.value.slice(...sliceDis)
  }

  function getById(id: number): Post[] {
    return posts.value.filter(post => post.id === id)
  }

  const fetchParams = reactive<LoopFetchParams>({
    start: fetchedPage.value + 1,
    stopFn: () => posts.value.length >= total.value,
    onResult: res => add(res),
    onEnd: async () => {
      fetchedPage.value = pages.value
      await exportData(posts.value, userStore.uid)
    },
  })

  /**
    * 获取所有微博
  */
  async function fetchAll(isStop = ref(false)) {
    const res = await fetchPosts(userStore.uid, 1)

    total.value = res?.total || 0
    add(res?.list || [])

    return await loopFetcher({
      ...fetchParams,
      start: fetchedPage.value + 1,
      isAbort: isStop,
      fetchFn: page => fetchPosts(userStore.uid, page),
    })
  }

  /**
 * 获取指定时间范围内的微博
 */
  async function fetchRange(start: Date, end: Date, isStop = ref(false)) {
    dateRange.value = [start, end]

    const res = await fetchRangePosts(userStore.uid, start, end, 1)
    total.value = res?.total || 0
    add(res?.list || [])

    return await loopFetcher({
      ...fetchParams,
      start: fetchedPage.value + 1,
      isAbort: isStop,
      fetchFn: page => fetchRangePosts(userStore.uid, start, end, page),
    })
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
    dateRange,
    postsPerPage,
    curPage,
    fetchedPage,

    add,
    get,
    getById,
    reset,

    fetchAll,
    fetchRange,
    searchText,
  }
})
