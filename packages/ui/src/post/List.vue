<script setup lang="ts">
import type { Post } from '@shared'

defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded px-2 py-4 md:w-60rem"
  >
    <n-back-top
      :bottom="36"
      :right="16"
      :visibility-height="600"
      title="返回顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><defs><mask id="ipTRocketOne0"><g fill="none" stroke="#fff" stroke-width="4"><path stroke-linecap="round" stroke-linejoin="round" d="m20.906 6.063l1.43-.954a3 3 0 0 1 3.328 0l1.43.954A20 20 0 0 1 36 22.703V33H12V22.704a20 20 0 0 1 8.906-16.641" /><circle cx="24" cy="20" r="6" fill="#555" /><path stroke-linecap="round" stroke-linejoin="round" d="m12 22l-6 6.217V33h36v-4.783L36 22M24 38v6m-8-4v2m16-2v2" /></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTRocketOne0)" /></svg>
    </n-back-top>

    <post-item
      v-for="item in posts"
      :key="item.id"
      :post="item"
    />
  </div>
</template>
