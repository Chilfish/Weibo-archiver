<script setup lang="ts">
import type { CardInfo } from '@types'

defineProps<{
  card: CardInfo
}>()
</script>

<template>
  <a
    :href="card.link"
    target="_blank"
    rel="noopener noreferrer"
    class="mt-4 h-30 flex items-center rounded-2 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 hover:dark:bg-dark-5"
  >
    <main-image
      class="mr-2 h-30 min-w-28 w-28 rounded-2"
      fit="cover"
      :src="card.img"
    />
    <div class="w-full p-2">
      <h4>{{ card.title }}</h4>
      <p class="mt-4 break-all text-3 text-gray-500!">{{ card.desc }}</p>
    </div>
  </a>
</template>
