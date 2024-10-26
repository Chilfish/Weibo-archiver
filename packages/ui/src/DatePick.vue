<script setup lang="ts">
import type { Post } from '@shared'
import dayjs from 'dayjs'

import { storeToRefs } from 'pinia'

const emits = defineEmits<{
  picked: [posts: Post[]]
}>()

const postStore = usePostStore()
const router = useRouter()
const route = useRoute()

const { pageSize, curPage } = storeToRefs(postStore)
const now = dayjs().valueOf()
const start = ref(now)
const end = ref(now)

const dateRange = computed<[number, number]>({
  get() {
    return [start.value, end.value]
  },
  set(val) {
    if (!val) {
      start.value = end.value = now
      return
    }

    start.value = dayjs(val[0]).hour(0).valueOf()
    end.value = dayjs(val[1]).hour(23).minute(59).second(59).valueOf()
  },
})

onMounted(() => {
  const query = route.query
  if (query.start && query.end) {
    start.value = Number(query.start) || now
    end.value = Number(query.end) || now
  }
})

watchImmediate([start, end], async () => {
  if (start.value === now && end.value === now) {
    router.push({
      query: {
        ...route.query,
        start: undefined,
        end: undefined,
        page: 1,
      },
    })
    return
  }

  const posts = await postStore.getByTime(1, start.value, end.value)
  router.push({
    query: {
      ...route.query,
      page: 1,
      start: start.value,
      end: end.value,
    },
  })
  emits('picked', posts)
})

watch([curPage, pageSize], async () => {
  if (start.value === now || end.value === now)
    return

  const posts = await postStore.getByTime(curPage.value, start.value, end.value)
  emits('picked', posts)
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
    />
  </div>
</template>
