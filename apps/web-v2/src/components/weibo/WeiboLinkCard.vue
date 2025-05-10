<script setup lang="ts">
import type { LinkCard } from '@weibo-archiver/core'
import { computed } from 'vue'
import LazyImage from '../common/LazyImage.vue'

const props = defineProps<{
  card: LinkCard
}>()

const desc = computed(() => {
  // 油猴脚本那边解析错了
  return props.card.desc?.replace('undefined - ', '')
})
</script>

<template>
  <a
    :href="card.link"
    target="_blank"
    rel="noopener noreferrer"
    class="url-card mb-4 border-1"
  >
    <LazyImage
      :src="card.img"
      :alt="card.title"
      referrerpolicy="no-referrer"
      class="h-28 w-30"
      skeleton-class="h-28 w-28"
    />
    <div class="url-card-content bg-muted">
      <h4 class="font-medium text-sm">
        {{ card.title }}
      </h4>
      <p class=" text-xs line-clamp-2 mt-2">
        {{ desc }}
      </p>
      <div class="text-xs text-gray-500 mt-auto line-clamp-1">
        {{ props.card.link }}
      </div>
    </div>
  </a>
</template>

<style>
.url-card {
  display: flex;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.url-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
}

.url-card-content {
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
