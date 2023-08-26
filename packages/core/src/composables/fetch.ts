import { createFetch } from '@vueuse/core'
import { ElMessage } from 'element-plus'
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

  await Promise.all(
    res.list.map(async (post) => {
      if (post.comments_count > 0)
        post.comments = await fetchComments(post.id)
    }),
  )

  const posts = await Promise.all(
    filterPosts(res.list)
      .filter(post => post.user.id === useUserStore().uid)
      .map(async (post) => {
        const text = await fetchLongText(post)
        post.text = text

        const reTweet = post?.retweeted_status
        if (reTweet)
          reTweet.text = await fetchLongText(reTweet)

        return post
      }),
  )

  return {
    ...res,
    list: posts,
    abort,
  }
}

export async function fetchLongText(post: Post) {
  const text = ref(post.text)

  if (post.isLongText) {
    await delay(1000)
    const { data } = await weiFetch(`/statuses/longtext?id=${post.mblogid}`)
      .json<{ data: { longTextContent: string } }>()

    text.value = data.value?.data.longTextContent || post.text
  }

  return parseText(text.value)
}

/**
 * 获取前 5 条评论 并集于 博主的评论
 * @param pid 微博的数字 id
 */
export async function fetchComments(pid: string): Promise<Comment[]> {
  await delay(2000)
  const { data } = await weiFetch(`/statuses/buildComments?flow=0&is_reload=1&id=${pid}&is_show_bulletin=2`).json<{ data: Comment[] }>()

  return data.value?.data || []
}

export async function fetchAll(isStop = ref(false)) {
  const postStore = usePostStore()

  for (let page = postStore.fetchedPage + 1; page <= postStore.pages; page++) {
    await delay(2000)
    const data = await fetchPosts(page)

    usePostStore().add(data!.list)
    if (isStop.value) {
      data?.abort()
      return
    }
  }
}
