<script setup lang="ts">
import { shortcuts } from '~/default'
import { preview } from '~/utils'

const id = useRoute().params.id as string
useUserStore().setUid(id)

const dateRange = ref([] as Date[])
const postStore = usePostStore()
const isFinish = ref(false)

async function start() {
  if (dateRange.value?.length === 0 || !dateRange.value) {
    const meta = await fetchPosts(postStore.curPage)
    postStore.setTotal(meta?.total || 0)
    isFinish.value = true
  }
}
</script>

<template>
  <div class="fixed right-4 top-20 w-md flex flex-col select-none justify-center gap-4 rounded-2 bg-white p-4 text-black">
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
      <button @click="start">
        开始
      </button>

      <button
        :disabled="!isFinish"
        @click="preview()"
      >
        预览
      </button>
    </div>
  </div>
</template>
