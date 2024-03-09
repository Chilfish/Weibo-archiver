<script setup lang="ts">
import type { User } from '@types'

const props = defineProps<{
  user: User
}>()

const publicStore = usePublicStore()

const avatar = computed(() => {
  const url = props.user.profile_image_url
  if (!url)
    return '/placeholder.webp'

  if (publicStore.curUid === props.user.id)
    return replaceImg(url)

  // 对于其他人的头像，就使用 CDN
  const { pathname } = new URL(url)
  return `${imgCdn}${pathname}`
})
</script>

<template>
  <a
    class="mr-auto flex items-center gap-3"
    target="_blank"
    :href="`https://weibo.com/u/${user.id}`"
  >
    <n-avatar
      lazy
      round
      bordered
      color="#9ca3af"
      text="2.5 center"
      :size="36"
      :src="avatar"
      :img-props="{
        alt: `${user.screen_name}'s avatar`,
      }"
    />

    <span
      class="font-bold hover:text-teal-700!"
    >
      {{ user.screen_name }}
    </span>
  </a>
</template>
