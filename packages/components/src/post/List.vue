<script setup lang="ts">
import type { Post } from '@weibo-archiver/core'

defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <div class="h-full w-full flex flex-col gap-4 rounded p-6 pb-8 sm:max-w-60rem">
    <Suspense>
      <post-item
        v-for="item in posts"
        :key="item.id"
        :post="item"
      >
        <Suspense>
          <post-retweeted
            v-if="item.retweeted_status"
            :post="item.retweeted_status"
            :card="item.card"
          />
        </Suspense>
      </post-item>
    </Suspense>
  </div>
</template>
