<script setup lang="ts">
import type { Post } from '@shared'

defineProps<{
  post: Post
}>()

const openComment = ref(false)
const articleRef = ref<HTMLElement | null>(null)

watchEffect(() => {
  if (!articleRef.value)
    return
  const comments = articleRef.value?.querySelector<HTMLDivElement>('.n-collapse-item__content-wrapper')

  comments?.style.setProperty('display', openComment.value ? 'block' : 'none')
})
</script>

<template>
  <article
    :id="post.mblogid"
    ref="articleRef"
    class="post flex flex-col gap-2 rounded-2 bg-white p-4 shadow dark:bg-dark"
  >
    <div class="flex justify-between">
      <post-profile />
      <post-meta
        :is-body="true"
        :meta="post"
      />
    </div>

    <main>
      <post-text :text="post.text" />
      <gallery
        v-if="!post.retweeted_status"
        :imgs="post.imgs"
      />
      <post-card
        v-if="post.card && !post.retweeted_status"
        :card="post.card"
      />

      <post-retweeted
        v-if="post.retweeted_status"
        :post="post.retweeted_status"
        :card="post.card"
      />
    </main>

    <post-action
      class="justify-start!"
      :post="post"
      @toggle-comment="openComment = !openComment"
    />

    <n-collapse
      :default-expanded-names="['comments']"
      display-directive="show"
    >
      <template #arrow>
        <span />
      </template>
      <n-collapse-item name="comments">
        <post-comments :comments="post.comments" />
      </n-collapse-item>
    </n-collapse>
  </article>
</template>

<style>
.post:hover .copy-id {
 opacity: 1;
}

.post .n-collapse-item__content-inner {
  padding: 0 !important;
}
</style>
