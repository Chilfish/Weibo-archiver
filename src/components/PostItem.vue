<script setup lang="ts">
import type { Post } from '~/types'

const props = defineProps<{
  post: Post
}>()

const date = useDateFormat(props.post.created_at, 'YY-MM-DD HH:mm dddd')
const detailUrl = `https://weibo.com/${useUserStore().uid}/${props.post.mblogid}`

const {
  data: textData,
  execute: fetchLongText,
} = weiFetch(`/longtext?id=${props.post.mblogid}`).json<{ data: { longTextContent: string } }>()

const text = computed(() => textData.value?.data.longTextContent || props.post.text_raw)

onMounted(() => {
  if (props.post.isLongText)
    fetchLongText()
})
</script>

<template>
  <article class="flex flex-col gap-2 rounded-2 bg-white p-3">
    <div class="flex justify-end gap-3 text-2 text-gray">
      <span v-if="post.source.length">
        来自 <span v-html="post.source" />
      </span>

      <span> {{ post.region_name }} </span>

      <el-link
        :underline="false"
        :href="detailUrl"
        target="_blank"
        class="text-gray-400! hover:text-gray-600!"
      >
        {{ date }}
      </el-link>
    </div>

    <main>
      <p class="whitespace-pre-wrap text-4">
        {{ text }}
      </p>
    </main>

    <div class="icons flex select-none justify-between px-4 sm:justify-center sm:gap-30">
      <span>
        <span class="icon i-tabler-share-3" />
        <span>{{ post.reposts_count }}</span>
      </span>

      <span>
        <span class="icon i-tabler-message" />
        <span>{{ post.comments_count }}</span>
      </span>

      <span>
        <span class="icon i-tabler-heart" />
        <span>{{ post.attitudes_count }}</span>
      </span>
    </div>
  </article>
</template>
