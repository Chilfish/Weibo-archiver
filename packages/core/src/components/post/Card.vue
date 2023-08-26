<script setup lang="ts">
import type { CardInfo } from '@core/types'

defineProps<{
  card: CardInfo
}>()
</script>

<template>
  <a
    :href="card.link"
    target="_blank"
    rel="noopener noreferrer"
    class="mt-2 h-30 flex items-center gap-2 rounded-2 bg-gray-200 hover:bg-gray-300"
  >
    <el-image
      class="mr-2 h-30 w-30 rounded-2"
      fit="cover"
      :referrerpolicy="referrerPolicy"
      :lazy="true"
      :src="card.img"
    />
    <div>
      <h4 class="text-black">{{ card.title }}</h4>
      <p class="mt-4 text-3 text-gray-500!">{{ card.desc }}</p>
    </div>
  </a>
</template>
