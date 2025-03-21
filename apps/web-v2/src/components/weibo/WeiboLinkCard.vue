<script setup lang="ts">
import type { CardInfo } from '@workspace/shared'
import LazyImage from '../common/LazyImage.vue'

defineProps<{
  card: CardInfo
}>()
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
      class="url-card-img"
    />
    <div class="url-card-content">
      <h4 class="font-medium text-gray-900 text-sm">
        {{ card.title }}
      </h4>
      <p class="text-gray-600 text-xs line-clamp-2">
        {{ card.desc }}
      </p>
      <div class="text-xs text-gray-500">
        {{ card.link }}
      </div>
    </div>
  </a>
</template>

<style>
/* URL 卡片样式 */
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

.url-card-img {
  width: 10rem;
  min-height: 100%;
  object-fit: cover;
}

.url-card-content {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
