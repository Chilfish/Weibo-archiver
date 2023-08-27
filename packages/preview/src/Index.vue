<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const postStore = usePostStore()
const router = useRouter()
const route = useRoute()

function update(p: number) {
  router.push(`/${p}`)
  postStore.setCurPage(p)
}

const page = computed({
  get() {
    const routePage = Number.parseInt(route.params.page as string) || postStore.curPage
    const page = routePage > postStore.pages ? postStore.pages : routePage
    update(page)
    return page
  },
  set(value) {
    update(value)
  },
})
</script>

<template>
  <Preview
    v-if="$route.params.page"
    v-model:page="page"
  />
</template>
