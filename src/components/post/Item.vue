<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()

const text = fetchLongText(props.post)
</script>

<template>
  <article
    class="flex flex-col gap-2 rounded-2 bg-white p-3"
  >
    <post-meta :post="post" />

    <main>
      <p class="whitespace-pre-wrap text-4">
        {{ text }}
      </p>

      <slot />
    </main>

    <post-action :post="post" />
  </article>
</template>
