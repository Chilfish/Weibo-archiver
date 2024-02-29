import type {
  Comment,
  FetchReturn,
  LoopFetchParams,
  Post,
  PostMeta,
} from '@types'
import {
  getOptions,
  postsParser,
  weiFetch,
} from '../utils'

/**
 * 鉴权字段，必须得登录才获取得了，不然匿名只能获取前两页 <br/>
 * 并且只能往前，同一个 id 对于即便不同 page 的结果也是一样的
 */
let since_id = ''

export async function fetchAllPosts(page = 1): FetchReturn {
  if (page === 0)
    return null
  else if (page === 1)
    since_id = ''

  const { uid } = await getOptions()

  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/mymblog?uid=${uid}&feature=0&page=${page}&since_id=${since_id}`)

  if (data)
    since_id = data.since_id
  else
    return null

  return {
    ...data,
    list: await postsParser(data.list),
  }
}

export async function fetchRangePosts(page = 1): FetchReturn {
  const { uid, dateRange } = await getOptions()
  const [start, end] = dateRange

  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/searchProfile?uid=${uid}&page=${page}&starttime=${start / 1000}&endtime=${end / 1000}&hasori=1&hasret=1&hastext=1&haspic=1&hasvideo=1&hasmusic=1`)

  return {
    ...data,
    list: await postsParser(data.list || []),
  }
}

export async function fetchLongText(
  post: Post & { isLongText: boolean },
) {
  let text = post.text

  if (post.isLongText) {
    await delay()
    const { data } = await weiFetch<{ data: { longTextContent: string } }>(`/statuses/longtext?id=${post.mblogid}`)

    text = data.longTextContent || post.text
  }

  return parseText(text)
}

/**
 * 获取前 3 条评论 并集于 博主的评论
 */
export async function fetchComments(post: Post): Promise<Comment[]> {
  const { commentCount, comment, picLarge } = await getOptions()
  const imgSize = picLarge ? 'woriginal' : 'large'

  if (!post.user || post.comments_count === 0 || !comment)
    return []

  await delay(3000)
  const { data } = await weiFetch<{ data: Comment[] }>(`/statuses/buildComments`, {
    params: {
      id: post.id,
      is_show_bulletin: post.is_show_bulletin, // 必填字段，区分旧微博和新微博
      flow: 0, // 热评
      is_reload: 1, // 获取详情页的评论
      is_mix: 0,
      count: 10,
      fetch_level: 0,
      locale: 'zh_CN',
      uid: post.user.id,
    },
  })

  if (!data)
    return []

  return filterComments(
    data.slice(0, commentCount),
    imgSize,
  )
}

interface FetchPosts {
  startPage: () => number
  isFetchAll: boolean
  setTotal: (total: number) => void
  addPosts: (posts: Post[]) => void
  stopCondition: () => boolean
}

/**
 * 爬取微博
 */
export async function fetchPosts(
  { startPage, isFetchAll, setTotal, addPosts, stopCondition }: FetchPosts,
) {
  async function fetching() {
    const page = startPage()
    const res = isFetchAll
      ? await fetchAllPosts(page)
      : await fetchRangePosts(page)
    addPosts(res?.list || [])
    console.log(`已获取第 ${page} 页`)
    return res
  }

  const res = await fetching()
  // 先获取总页数
  setTotal(res?.total || 0)

  const { startLoop, resume, pause } = usePausableLoop(
    async () => {
      await fetching()

      // 如果已经获取到所有帖子
      if (stopCondition())
        return { isStop: true }
      return { isStop: false }
    },
  )

  startLoop()

  return {
    pause,
    resume,
  }
}

/**
 * @deprecated use {@link usePausableLoop} instead
 */
export async function loopFetcher(
  { start, stopFn, fetchFn, onResult, onEnd, isAbort }: LoopFetchParams,
) {
  let page = start + 1
  while (!stopFn()) {
    await delay()
    if (isAbort)
      return

    const data = await fetchFn?.(page)
    onResult(data!.list)

    // 无数据时，直接退出
    if (data!.list.length === 0) {
      await onEnd?.()
      return
    }
    page++
  }

  await onEnd?.()
}
