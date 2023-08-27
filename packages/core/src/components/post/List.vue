<script setup lang="ts">
import type { Post } from '@core/types'

defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <div class="mb-auto flex flex-col gap-3 rounded p-8 sm:max-w-60rem">
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
