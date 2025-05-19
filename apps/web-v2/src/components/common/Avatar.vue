<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = defineProps<{
  src: string
  alt?: string
  size?: number | string
  class?: string
}>()

const sizeClass = computed(() => {
  return props.size ? `w-${props.size} h-${props.size}` : 'w-10 h-10'
})
</script>

<template>
  <Avatar>
    <AvatarImage
      :src="props.src"
      :alt="props.alt"
      :class="sizeClass"
    />
    <AvatarFallback>{{ props.alt }}</AvatarFallback>
  </Avatar>
</template>
