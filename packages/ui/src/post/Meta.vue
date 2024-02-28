<script setup lang="ts">
import type { Comment, Post, Retweet } from '@types'
import { useRoute } from 'vue-router'

const props = defineProps<{
  meta: Post | Comment | Retweet
  isBody?: boolean
}>()

const date = useDateFormat(props.meta.created_at, 'YY-MM-DD HH:mm dddd')

const route = useRoute()
const { origin } = document.location

const url = computed(() =>
  `${origin}${route.fullPath.replace(/#.+/, '')}#${(props.meta as any).mblogid}`,
)
const message = useMessage()

const { copy } = useClipboard({
  source: url,
})
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-end gap-1 text-3 text-gray sm:gap-3"
  >
    <a
      v-if="'mblogid' in meta && isBody"
      :href="url"
      class="copy-id opacity-0 transition-opacity"
      @click="() => {
        copy()
        message.success('复制成功')
      }"
    >
      复制本地链接
    </a>

    <a
      v-if="'detail_url' in meta"
      :href="meta.detail_url"
      target="_blank"
    >
      跳转到原微博
    </a>

    <span>{{ date }}</span>

    <span> {{ meta.region_name }} </span>

    <span v-if="meta.source" class="hidden sm:inline">
      来自 <span v-html="meta.source" />
    </span>
  </div>
</template>
