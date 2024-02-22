import type {
  Comment,
  FetchReturn,
  LoopFetchParams,
  Post,
  PostMeta,
} from '@types'
import {
  aborter,
  getOptions,
  postsParser,
  weiFetch,
} from '../utils'

const options = await getOptions()

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

  const { uid } = options

  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/mymblog?uid=${uid}&feature=0&page=${page}&since_id=${since_id}`)

  if (data)
    since_id = data.since_id
  else
    return null

  return {
    ...data,
    list: await postsParser(data.list),
    abort: aborter.abort,
  }
}

export async function fetchRangePosts(page = 1): FetchReturn {
  const { uid, dateRange } = options
  const [start, end] = dateRange

  const { data } = await weiFetch<{ data: PostMeta }>(`/statuses/searchProfile?uid=${uid}&page=${page}&starttime=${start / 1000}&endtime=${end / 1000}&hasori=1&hasret=1&hastext=1&haspic=1&hasvideo=1&hasmusic=1`)

  return {
    ...data,
    list: await postsParser(data.list || []),
    abort: aborter.abort,
  }
}

export async function fetchLongText(
  post: Post & { isLongText: boolean },
): Promise<string> {
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
  const { commentCount, comment } = options

  if (!post.user || post.comments_count === 0 || !comment)
    return []

  await delay(3000)
  const { data } = await weiFetch<{ data: Comment[] }>(`/statuses/buildComments?flow=0&is_reload=1&id=${post.id}&is_show_bulletin=2`)

  if (!data)
    return []

  const userComments = data.filter(comment => comment.user?.id === post.user?.id)
  const othersComments = data.filter(comment => comment.user?.id !== post.user?.id)

  return filterComments(Array.from(
    new Set([
      ...userComments,
      ...othersComments.slice(0, commentCount),
    ]),
  ))
}

export async function loopFetcher(
  { start, stopFn, fetchFn, onResult, onEnd, isAbort }: LoopFetchParams,
) {
  let page = start + 1
  while (!stopFn()) {
    await delay()
    if (isAbort?.value)
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
