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
  <article class="mt-4 flex flex-col gap-2 rounded-2 bg-light p-3">
    <profile :user="post.user" />
    <main>
      <p class="whitespace-pre-wrap text-4" v-html="text" />
      <gallery :imgs="imgs" />
    </main>
    <div class="flex justify-between text-gray">
      <post-meta :post="post" />
    </div>
  </article>
</template>
