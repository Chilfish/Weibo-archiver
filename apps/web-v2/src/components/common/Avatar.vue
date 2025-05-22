<script setup lang="ts">
import { imgCdn } from '@weibo-archiver/core'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = defineProps<{
  src: string
  alt?: string
  size?: string
  class?: string
}>()
</script>

<template>
  <Avatar
    :class="`${props.size}`"
  >
    <AvatarImage
      :src="`${imgCdn}${props.src}`"
      :alt="props.alt"
      :class="props.class"
    />
    <AvatarFallback>{{ props.alt }}</AvatarFallback>
  </Avatar>
</template>
