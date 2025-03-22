<script setup lang="ts">
import type { CardInfo } from '@workspace/shared'
import { computed } from 'vue'
import LazyImage from '../common/LazyImage.vue'

const props = defineProps<{
  card: CardInfo
}>()

const shortLink = computed(() => {
  try {
    const url = new URL(props.card.link)
    return url.hostname
  }
  catch (error) {
    return props.card.link
  }
})

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
    class="url-card mb-4"
  >
    <LazyImage
      :src="card.img"
      :alt="card.title"
      referrerpolicy="no-referrer"
      class="h-28 w-28"
      skeleton-class="h-28 w-28"
    />
    <div class="url-card-content">
      <h4 class="font-medium text-gray-900 text-sm">
        {{ card.title }}
      </h4>
      <p class="text-gray-600 text-xs line-clamp-2 mt-2">
        {{ desc }}
      </p>
      <div class="text-xs text-gray-500 mt-auto">
        {{ shortLink }}
      </div>
    </div>
  </a>
</template>

<style>
.url-card {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #f9f9fb;
  transition: all 0.2s ease;
}

.url-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  background-color: #f0f7ff;
}

.url-card-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
}
</style>
