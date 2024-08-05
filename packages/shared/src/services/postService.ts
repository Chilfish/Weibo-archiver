import type {
  Comment,
  FetchOptions,
  FetchReturn,
  Post,
  PostMeta,
} from '../types'
import {
  delay,
  filterComments,
  isBrowser,
  parseText,
  postsParser,
  usePausableLoop,
  weiFetch,
} from '../'

/**
 * 获取微博总数
 */
export async function getTotal(uid: string) {
  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/mymblog`, {
    params: {
      uid,
      page: 1,
      feature: 0,
    },
  })

  return data.total || 0
}

/**
 * 有没有可能，获取全部微博可以用 rangePosts 来实现？不设 start 参数……
 * 实际上并不行，会有缺失的微博
 * @param uid 用户 id
 * @param page 页数
 */
export async function fetchAllPosts(
  uid: string,
  page = 1,
): FetchReturn {
  if (page === 0)
    return null

  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/mymblog`, {
    params: {
      uid,
      page,
      feature: 0,
    },
  })

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
      starttime: dayStart(start) / 1000,
      endtime: dayEnd(end) / 1000,
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
  post: Post & { isLongText?: boolean },
) {
  let text = post.text

  if (post.isLongText) {
    const { data } = await weiFetch<{
      data: { longTextContent?: string }
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
  fetchOptions: () => FetchOptions
  onFinish: () => Promise<void>
  setTotal: (total: number) => void
}

/**
 * 爬取微博
 */
export function fetchPosts(
  { fetchOptions, onFinish, setTotal }: FetchPosts,
) {
  async function fetching() {
    await delay(3000)
    const { uid, startAt, endAt, hasRepost, curPage, isFetchAll } = fetchOptions()
    const page = curPage + 1

    if (isBrowser)
      console.log(`正在获取第 ${page} 页`)

    return isFetchAll
      ? await fetchAllPosts(uid, page)
      : await fetchRangePosts(uid, startAt, endAt, page, hasRepost)
  }

  const { start, pause } = usePausableLoop(async () => {
    const res = await fetching()
    if (res?.total && res.total > 0)
      setTotal(res.total)

    await postsParser(res?.list || [], fetchOptions())
    const isEnd = !res?.list.length

    // 如果已经获取到所有帖子
    if (isEnd) {
      await onFinish()
      return { isFinished: true }
    }
    return { isFinished: false }
  },
  )

  return {
    start,
    pause,
  }
}
