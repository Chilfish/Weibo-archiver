<script setup lang="ts">
import type { User } from '@shared'

import { KeyUser } from '@core/constants/vueProvide'

const props = defineProps<{
  user?: User
}>()

const publicStore = usePublicStore()

const user = toRef(props.user || inject(KeyUser) || publicStore.curUser!)

const avatar = computed(() => {
  const url = user.value.avatar
  if (!url)
    return '/placeholder.webp'

  if (publicStore.curUid === user.value.uid)
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
