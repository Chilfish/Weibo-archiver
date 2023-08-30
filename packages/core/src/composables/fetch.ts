import { createFetch } from '@vueuse/core'
import type { Comment, Post, PostMeta } from '@core/types'

export const weiFetch = createFetch({
  baseUrl: 'https://weibo.com/ajax',
  combination: 'overwrite',
  options: {
    onFetchError(ctx) {
      ElMessage.error(ctx.error?.message || 'Fetch Error')
      return ctx
    },
  },
})

export async function fetchUser(id?: string, name?: string) {
  const { data } = await weiFetch(`/user/popcard/get?screen_name=${name}&id=${id}`).json()

  const { idstr, screen_name } = data.value?.data || {}
  useUserStore().set(idstr, screen_name)
}

// 鉴权字段，必须得登录才获取得了，不然匿名只能获取前两页
// 并且只能往前，同一个 id 对于即便不同 page 的结果也是一样的
const since_id = ref('')

export async function fetchPosts(page: number) {
  if (page === 0)
    return null
  if (page === 1)
    since_id.value = ''

  const { data, abort } = await weiFetch(`/statuses/mymblog?uid=${useUserStore().uid}&feature=0&page=${page}&since_id=${since_id.value}`)
    .json<{ data: PostMeta }>()

  const res = data.value?.data
  if (res)
    since_id.value = res.since_id
  else
    return null

  return {
    ...res,
    list: await parse(res.list),
    abort,
  }
}

export async function fetchRangePosts(page = 1) {
  const [s, e] = usePostStore().dateRange.map(d => Math.round(d.getTime() / 1000))

  const { data, abort } = await weiFetch(`/statuses/searchProfile?uid=${useUserStore().uid}&page=${page}&starttime=${s}&endtime=${e}&hasori=1&hasret=1&hastext=1&haspic=1&hasvideo=1&hasmusic=1`)
    .json<{ data: PostMeta }>()

  const res = data.value?.data
  return {
    ...res,
    list: await parse(res?.list || []),
    total: res?.total || 0,
    abort,
  }
}

export async function fetchLongText(post: Post) {
  const text = ref(post.text)

  if (post.isLongText) {
    await delay()
    const { data } = await weiFetch(`/statuses/longtext?id=${post.mblogid}`)
      .json<{ data: { longTextContent: string } }>()

    text.value = data.value?.data.longTextContent || post.text
  }

  return parseText(text.value)
}

/**
 * 获取前 3 条评论 并集于 博主的评论
 * @param pid 微博的数字 id
 */
export async function fetchComments(pid: string): Promise<Comment[]> {
  await delay(3000)
  const { data } = await weiFetch(`/statuses/buildComments?flow=0&is_reload=1&id=${pid}&is_show_bulletin=2`).json<{ data: Comment[] }>()

  const res = data.value?.data
  if (!res)
    return []

  const userComments = res.filter(comment => comment.user.id === useUserStore().uid)
  const othersComments = res.filter(comment => comment.user.id !== useUserStore().uid)

  return Array
    .from(new Set([
      ...userComments,
      ...othersComments.slice(0, 3),
    ]))
}

async function loopFetcher(fn: (page: number) => Promise<any>, isStop = ref(false)) {
  const postStore = usePostStore()
  for (
    let page = postStore.fetchedPage + 1;
    postStore.posts.length < postStore.total; // 数量比页数更准确
    page++
  ) {
    await delay()
    const data = (await fn(page))!

    // 无数据时，直接退出
    if (data.list.length === 0)
      return null

    postStore.add(data.list)
    if (isStop.value) {
      data.abort()
      return
    }
  }

  postStore.fetchedPage = postStore.pages
  await exportData()
}

/**
 * 获取所有微博
 */
export async function fetchAll(isStop = ref(false)) {
  const postStore = usePostStore()

  const res = await fetchPosts(postStore.curPage)
  postStore.total = res?.total || 0
  postStore.add(res?.list || [])

  return await loopFetcher(fetchPosts, isStop)
}

/**
 * 获取指定时间范围内的微博
 */
export async function fetchRange(start: Date, end: Date, isStop = ref(false)) {
  const postStore = usePostStore()
  postStore.dateRange = [start, end]

  const res = await fetchRangePosts()
  postStore.total = res?.total || 0
  postStore.add(res.list)

  return await loopFetcher(fetchRangePosts, isStop)
}
