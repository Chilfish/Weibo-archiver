<script setup lang="ts">
import type { Post } from '@core/types'

defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <div class="m-auto flex flex-col gap-4 rounded px-8 sm:max-w-55rem">
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
          />
        </Suspense>
      </post-item>
    </Suspense>
  </div>
</template>
