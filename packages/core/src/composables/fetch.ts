import { createFetch } from '@vueuse/core'
import type { Comment, FetchReturn, LoopFetchParams, Post, PostMeta } from '../types'
import { postsParser } from '../utils'
import { useConfigStore } from './../stores/config'

export const weiFetch = createFetch({
  baseUrl: 'https://weibo.com/ajax',
  combination: 'overwrite',
  options: {
    onFetchError(ctx) {
      console.log(ctx.error?.message || 'Fetch Error')
      return ctx
    },
  },
})

export async function fetchUser(id?: string, name?: string) {
  const { data } = await weiFetch(`/user/popcard/get?screen_name=${name}&id=${id}`).json()

  const { idstr, screen_name } = data.value?.data || {}
  return {
    id: idstr,
    name: screen_name,
  }
}

// 鉴权字段，必须得登录才获取得了，不然匿名只能获取前两页
// 并且只能往前，同一个 id 对于即便不同 page 的结果也是一样的
let since_id = ''

export async function fetchPosts(
  page = 1,
): FetchReturn {
  if (page === 0)
    return null
  if (page === 1)
    since_id = ''

  const uid = useUserStore().uid

  const {
    data,
    abort,
  } = await weiFetch(`/statuses/mymblog?uid=${uid}&feature=0&page=${page}&since_id=${since_id}`)
    .json<{ data: PostMeta }>()

  const res = data.value?.data
  if (res)
    since_id = res.since_id
  else
    return null

  return {
    ...res,
    list: await postsParser(res.list, uid),
    abort,
  }
}

export async function fetchRangePosts(
  page = 1,
): FetchReturn {
  const [start, end] = useConfigStore().state.dateRange
  const uid = useUserStore().uid

  const s = start.getTime() / 1000
  const e = end.getTime() / 1000

  const { data, abort } = await weiFetch(`/statuses/searchProfile?uid=${uid}&page=${page}&starttime=${s}&endtime=${e}&hasori=1&hasret=1&hastext=1&haspic=1&hasvideo=1&hasmusic=1`)
    .json<{ data: PostMeta }>()

  const res = data.value!.data
  return {
    ...res,
    list: await postsParser(res?.list || [], uid),
    abort,
  }
}

export async function fetchLongText(
  post: Post & { isLongText: boolean },
): Promise<string> {
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
 */
export async function fetchComments(
  post: Post,
): Promise<Comment[]> {
  const config = useConfigStore().state

  if (!post.user || post.comments_count === 0 || !config.comment)
    return []

  await delay(3000)
  const { data } = await weiFetch(`/statuses/buildComments?flow=0&is_reload=1&id=${post.id}&is_show_bulletin=2`).json<{ data: Comment[] }>()

  const res = data.value?.data
  if (!res)
    return []

  const userComments = res.filter(comment => comment.user?.id === post.user?.id)
  const othersComments = res.filter(comment => comment.user?.id !== post.user?.id)

  return filterComments(Array.from(
    new Set([
      ...userComments,
      ...othersComments.slice(0, config.commentCount),
    ]),
  ))
}

export async function loopFetcher(
  { start, stopFn, fetchFn, onResult, onEnd, isAbort }: LoopFetchParams,
) {
  let page = start
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
