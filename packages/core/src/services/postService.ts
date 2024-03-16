import type {
  Comment,
  FetchOptions,
  FetchReturn,
  Post,
  PostMeta,
} from '@types'
import {
  postsParser,
  weiFetch,
} from '../utils'

/**
 * 鉴权字段，必须得登录才获取得了，不然匿名只能获取前两页 <br/>
 * 并且只能往前，同一个 id 对于即便不同 page 的结果也是一样的
 */
let since_id = ''

/**
 * 有没有可能，获取全部微博可以用 rangePosts 来实现？不设 start 参数……
 * 实际上并不行，会有缺失的微博
 */
export async function fetchAllPosts(
  uid: string,
  page = 1,
): FetchReturn {
  if (page === 0)
    return null
  else if (page === 1)
    since_id = ''

  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/mymblog`, {
    params: {
      uid,
      page,
      feature: 0,
      since_id,
    },
  })

  if (data)
    since_id = data.since_id
  else
    return null

  return data
}

export async function fetchRangePosts(
  uid: string,
  start: number,
  end: number,
  page = 1,
  hasRepost = true,
): FetchReturn {
  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/searchProfile`, {
    params: {
      uid,
      page,
      starttime: start / 1000,
      endtime: end / 1000,
      hasori: 1, // 是否包含原创
      hasret: hasRepost ? 1 : 0, // 是否包含转发
      hastext: 1, // 是否包含文字
      haspic: 1, // 是否包含图片
      hasvideo: 1, // 是否包含视频
      hasmusic: 1, // 是否包含音乐
    },
  })

  return data
}

export async function fetchLongText(
  post: Post & { isLongText: boolean },
) {
  let text = post.text

  if (post.isLongText) {
    await delay()
    const { data } = await weiFetch<{
      data: { longTextContent: string }
    }>(`/statuses/longtext`, {
      params: {
        id: post.id,
      },
    })

    text = data.longTextContent || post.text
  }

  return parseText(text)
}

/**
 * 获取评论
 * @param postId 微博 id
 * @param uid 用户 id
 * @param isShowBulletin 必填字段，区分旧微博和新微博
 * @param count 获取数量
 */
export async function fetchComments(
  postId: string,
  uid: string,
  isShowBulletin: number,
  count: number,
): Promise<Comment[]> {
  await delay(3000)
  const { data } = await weiFetch<{ data: Comment[] }>(`/statuses/buildComments`, {
    params: {
      id: postId,
      is_show_bulletin: isShowBulletin,
      flow: 0, // 热评
      is_reload: 1, // 获取详情页的评论
      is_mix: 0,
      count: 10,
      fetch_level: 0,
      locale: 'zh_CN',
      uid,
    },
  })

  if (!data)
    return []

  return filterComments(data.slice(0, count))
}

interface FetchPosts {
  fetchOptions: FetchOptions
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
  { fetchOptions, startPage, isFetchAll, setTotal, addPosts, stopCondition }: FetchPosts,
) {
  const { uid, dateRange, hasRepost } = fetchOptions
  const [start, end] = dateRange

  async function fetching() {
    const page = startPage()
    const res = isFetchAll
      ? await fetchAllPosts(uid, page)
      : await fetchRangePosts(uid, start, end, page, hasRepost)
    const list = await postsParser(res?.list || [], fetchOptions)

    addPosts(list)
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
