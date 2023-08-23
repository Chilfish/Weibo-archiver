<script setup lang="ts">
import type { Post } from '~/types'
import { parseImg } from '~/utils'

const props = defineProps<{
  post: Post
}>()

const text = fetchLongText(props.post)
const imgs = parseImg(props.post.pic_ids, props.post.pic_infos)
</script>

<template>
  <article
    class="flex flex-col gap-2 rounded-2 bg-white p-3"
  >
    <div class="flex justify-between">
      <profile :user="post.user" />
      <post-meta :post="post" />
    </div>

    <main>
      <p class="whitespace-pre-wrap text-4" v-html="text" />
      <gallery :imgs="imgs" />
      <slot />
    </main>

    <post-action class="justify-start!" :post="post" />
  </article>
</template>
