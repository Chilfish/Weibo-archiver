<script setup lang="ts">
import type { Comment, Post, Retweet } from '@shared'
// import { useMessage } from 'naive-ui'

const props = defineProps<{
  meta: Post | Comment | Retweet
  isBody?: boolean
}>()

const date = useDateFormat(props.meta.created_at, 'YY-MM-DD HH:mm')

// const url = computed(() => `#${(props.meta as any).mblogid}`)
// const message = useMessage()

// const { copy } = useClipboard({
//   source: url,
// })
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-end gap-1 text-3 text-gray sm:gap-3"
    :style="{
      flexDirection: isBody ? 'row' : 'row-reverse',
    }"
  >
    <!-- <a
      v-if="'mblogid' in meta && isBody"
      :href="url"
      class="copy-id opacity-0 transition-opacity"
      @click="() => {
        copy()
        message.success('复制成功')
      }"
    >
      复制本地链接
    </a> -->

    <a
      v-if="'detail_url' in meta"
      :href="meta.detail_url"
      target="_blank"
      class="to-weibo opacity-0 transition-opacity"
    >
      跳转到原微博
    </a>

    <span>{{ date }}</span>

    <span v-if="meta.region_name">
      {{ meta.region_name.replace(' ', '') }}
    </span>

    <span
      v-if="meta.source"
      class="hidden sm:inline"
    >
      来自<span v-html="meta.source" />
    </span>
  </div>
</template>

<style lang="scss">
.post:hover a.to-weibo {
  opacity: 1;
}
</style>
