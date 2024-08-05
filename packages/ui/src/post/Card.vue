<script setup lang="ts">
import type { CardInfo } from '@shared'

defineProps<{
  card: CardInfo
}>()
</script>

<template>
  <a
    :href="card.link"
    target="_blank"
    class="mt-4 h-30 flex items-center rounded-2"
    bg="gray-200 dark:dark-700 hover:gray-300 hover-dark:dark-800"
  >
    <main-image
      class="h-28 w-28 rounded-2"
      fit="cover"
      preview-disabled
      min-height="7rem"
      :src="card.img"
    />
    <div class="flex flex-col p-4">
      <h4 class="text-wrap">
        {{ card.title }}
      </h4>
      <p class="mt-4 text-wrap text-3 text-gray-4!">
        {{ card.desc }}
      </p>
    </div>
  </a>
</template>
