import { createFetch } from '@vueuse/core'
import type { Post, PostMeta } from '~/types'

export const weiFetch = createFetch({
  baseUrl: 'https://weibo.com/ajax/statuses',
  combination: 'overwrite',
  options: {
    immediate: false,
  },
})

export function fetchPosts(page = 0) {
  return weiFetch(`/mymblog?uid=${useUserStore().uid}&feature=0&page=${page}`)
    .json<{ data: PostMeta }>()
}

export function fetchLongText(post: Post) {
  const { data } = weiFetch(`/longtext?id=${post.mblogid}`,
    { immediate: true },
  ).json<{ data: { longTextContent: string } }>()

  const text = computed(() => data.value?.data.longTextContent || post.text_raw)

  return text
}
