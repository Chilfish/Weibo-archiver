<script setup lang="ts">
import type { UserInfo } from '@types'

const props = defineProps<{
  user: UserInfo
}>()

const publicStore = usePublicStore()
const { user } = toRefs(props)

const avatar = computed(() => {
  const url = props.user.avatar
  if (!url)
    return '/placeholder.webp'

  if (publicStore.curUid === props.user.uid)
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
    :href="`https://weibo.com/u/${user.uid}`"
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
        alt: `${user.name}'s avatar`,
      }"
    />

    <span
      class="font-bold hover:text-teal-700!"
    >
      {{ user.name }}
    </span>
  </a>
</template>
