<script setup lang="ts">
import { shortcuts } from '~/default'

const dateRange = ref([] as Date[])
</script>

<template>
  <div class="fixed right-4 top-20 w-md flex flex-col justify-center gap-4 rounded-2 bg-white p-4 text-black">
    <h2 class="text-5 font-bold">
      Weibo archiver
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

    <div class="flex gap-4">
      <button
        @click="console.log(dateRange[0].getFullYear())"
      >
        开始
      </button>
    </div>
  </div>
</template>
