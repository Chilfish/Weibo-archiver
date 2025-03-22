<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { usePostStore, usePublicStore } from '@workspace/core'
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Pagination from '../common/Pagination.vue'

const postStore = usePostStore()
const publicStore = usePublicStore()

const curPage = useRouteQuery<number>('page', 1)
const route = useRoute()
const router = useRouter()

onBeforeMount(async () => {
  await postStore.init()
  await postStore.get(curPage.value).then(res => res.map(post => ({
    ...post,
    user: publicStore.curUser,
  })))
})

function changePage(page: number, pageSize: number) {
  console.log(page, pageSize)
  postStore.get(page).then(res => res.map(post => ({
    ...post,
    user: publicStore.curUser,
  })))

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  router.push({
    query: {
      ...route.query,
      page,
      pageSize,
    },
  })
}
</script>

<template>
  <div>
    <section class="flex flex-col gap-4">
      <Weibo
        v-for="post in postStore.weibos"
        :key="post.id"
        :post="post"
      />

      <Pagination
        v-model:current="postStore.curPage"
        v-model:page-size="postStore.pageSize"
        :total="postStore.total"
        class="mt-4"
        @change="changePage"
      />
    </section>
  </div>
</template>
