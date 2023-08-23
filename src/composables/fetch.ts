import { createFetch } from '@vueuse/core'
import { parseText } from '~/utils'
import type { Post, PostMeta } from '~/types'

export const weiFetch = createFetch({
  baseUrl: 'https://weibo.com/ajax/statuses',
  combination: 'overwrite',
})

// 鉴权字段，必须得登录才获取得了，不然匿名只能获取前两页
// 并且只能往前，同一个 id 对于即便不同 page 的结果也是一样的
const since_id = ref('')

export async function fetchPosts(page: number) {
  if (page === 0)
    return null
  if (page === 1)
    since_id.value = ''

  const { data } = await weiFetch(`/mymblog?uid=${useUserStore().uid}&feature=0&page=${page}&since_id=${since_id.value}`)
    .json<{ data: PostMeta }>()

  const res = data.value?.data || null
  if (res)
    since_id.value = res.since_id

  return res
}

export function fetchLongText(post: Post) {
  const { data } = weiFetch(`/longtext?id=${post.mblogid}`)
    .json<{ data: { longTextContent: string } }>()

  const text = computed(() => data.value?.data.longTextContent || post.text_raw)

  return parseText(text.value)
}
