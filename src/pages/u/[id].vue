<script setup lang="ts">
import { shortcuts } from '~/default'
import type { PostMeta } from '~/types'

const id = useRoute().params.id as string
useUserStore().setUid(id)

const dateRange = ref([] as Date[])
const showPreview = ref(false)
const curPage = ref(1)

const data = ref< PostMeta | null>(null)

async function start() {
  if (dateRange.value?.length === 0 || !dateRange.value)
    data.value = await fetchPosts(curPage.value)
}

// 过滤掉主页上例如 “ta点赞过的微博” 这些不是用户自己发的微博
const filteredList = computed(() => data.value?.list.filter(post => post.user.idstr === id))

const pages = computed(() => {
  const total = data.value?.total
  if (!total)
    return 0

  return Math.ceil(total / 20)
})

watch(curPage, async () => {
  data.value = await fetchPosts(curPage.value)
})
</script>

<template>
  <div class="fixed right-4 top-20 w-md flex flex-col justify-center gap-4 rounded-2 bg-white p-4 text-black">
    <h2 class="text-5 font-bold">
      Weibo archiver, id: {{ id }}
    </h2>

    <p>请选择要存档的范围，默认为从头到尾</p>

    <!-- @vue-expect-error -->
    <el-date-picker
      v-model="dateRange"
      unlink-panels
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      range-separator="到"
      :shortcuts="shortcuts"
    />

    <div class="btns flex gap-4">
      <button @click="start()">
        开始
      </button>

      <button @click="showPreview = true">
        预览
      </button>
    </div>
  </div>

  <el-dialog
    v-if="filteredList"
    v-model="showPreview"
    class="w-90%! rounded-2!"
    title="预览"
  >
    <div class="flex flex-col items-center justify-center">
      <post-list :list="filteredList" />

      <div class="btns mt-4 flex gap-4">
        <button :disabled="curPage === pages" @click="curPage++">
          下一页
        </button>
      </div>
    </div>
  </el-dialog>
</template>
