<script setup lang="ts">
import type { User } from '@types'

const props = defineProps<{
  user: User
}>()

const me = useStorage('meta', { uid: '' })
const isMe = computed(() => {
  return me.value.uid === props.user.id
})

const avatar = computed(() => {
  const url = props.user.profile_image_url
  if (!url)
    return '/placeholder.webp'

  if (isMe.value)
    return replaceImg(url)

  // 评论区的头像就用 cdn 的就行
  const { pathname } = new URL(url)
  return `${imgCdn}${pathname}`
})
</script>

<template>
  <a
    class="mr-auto flex items-center gap-3"
    :href="`https://weibo.com/u/${user.id}`"
    target="_blank"
  >
    <n-avatar
      lazy round
      fallback-src="/placeholder.webp"
      :size="30"
      :src="avatar"
    />

    <span
      class="text-3.5! font-bold! hover:text-teal-700!"
    >
      {{ user.screen_name }}
    </span>
  </a>
</template>
