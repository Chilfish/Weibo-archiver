<script setup lang="ts">
import dayjs from 'dayjs'
import type { Post } from '@types'

import { useRouteQuery } from '@vueuse/router'

const emits = defineEmits<{
  picked: [posts: Post[]]
}>()
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('pageSize', 10, { transform: Number })
const postStore = usePostStore()
const router = useRouter()
const route = useRoute()

const now = dayjs().valueOf()
const start = ref(now)
const end = ref(now)

const dateRange = computed<[number, number]>({
  get() {
    return [start.value, end.value]
  },
  set(val) {
    start.value = dayjs(val[0]).hour(0).valueOf()
    end.value = dayjs(val[1]).hour(23).minute(59).second(59).valueOf()
  },
})

onMounted(() => {
  const query = route.query
  start.value = Number(query.start) || now
  end.value = Number(query.end) || now
})

async function getPosts(page = 1) {
  const data = await postStore.getByTime(start.value, end.value, page)
  emits('picked', data)
}

watchImmediate([start, end], async () => {
  if (start.value === now)
    return

  await getPosts()
  router.push({
    query: {
      ...route.query,
      start: start.value,
      end: end.value,
    },
  })
})

watch([page, pageSize], async () => {
  if (route.query.start)
    await getPosts(page.value)
})
</script>

<template>
  <div class="flex items-center gap-4">
    <p class="min-w-fit">
      按时间筛选
    </p>
    <n-date-picker
      v-model:value="dateRange"
      type="daterange"
      size="small"
      clearable
      bind-calendar-months
      @confirm="getPosts"
    />
  </div>
</template>
