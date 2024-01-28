<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const postStore = usePostStore()
const router = useRouter()
const route = useRoute()

const pageSize = computed({
  get() {
    const routePageSize = Number.parseInt(route.query.pageSize as string) || postStore.postsPerPage
    postStore.postsPerPage = routePageSize

    return routePageSize
  },
  set(value) {
    router.push({
      query: {
        pageSize: value,
      },
    })

    postStore.postsPerPage = value
  },
})

const page = computed({
  get() {
    const routePage = Number.parseInt(route.params.page as string) || postStore.curPage
    const page = routePage > postStore.pages ? postStore.pages : routePage

    postStore.curPage = page
    return page
  },
  set(value) {
    router.push({
      path: `/p/${value}`,
      query: {
        pageSize: pageSize.value,
      },
    })
    postStore.curPage = value
  },
})
</script>

<template>
  <main class="mt-12">
    <Preview
      v-if="$route.params.page"
      v-model:page="page"
      v-model:page-size="pageSize"
    />
  </main>
</template>
