<script setup lang="ts">
import type { CardInfo } from '@weibo-archiver/core'

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
    <el-image
      class="mr-2 h-30 w-30 rounded-2"
      fit="cover"
      :referrerpolicy="referrerPolicy"
      :lazy="true"
      :src="replaceImg(card.img)"
    />
    <div class="w-full p-2">
      <h4>{{ card.title }}</h4>
      <p class="mt-4 break-all text-3 text-gray-500!">{{ card.desc }}</p>
    </div>
  </a>
</template>
