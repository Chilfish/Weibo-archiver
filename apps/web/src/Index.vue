<script setup lang="ts">
import type { Post } from '@types'

const postStore = usePostStore()
onBeforeMount(async () => {
  const data = await indexDB.getItem<Post[]>('posts')
  postStore.set(data ?? [])

  const user = postStore.posts[0]?.user
  localStorage.setItem('user', JSON.stringify({
    uid: user?.id,
    name: user?.screen_name,
  }))
})
</script>

<template>
  <main>
    <!-- TODO: for debug -->
    <!-- <n-dialog
      :show-icon="false"
      title=" "
      class="m-16"
    >
      <SettingsWeb />
    </n-dialog> -->

    <Preview
      v-if="$route.params.page"
    />
  </main>
</template>
