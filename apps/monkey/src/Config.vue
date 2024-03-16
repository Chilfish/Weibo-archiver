<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfigStore } from './stores'

const { state: config } = storeToRefs(useConfigStore())

const dateRange = computed({
  get() {
    return config.value.dateRange
  },
  set(val: [number, number]) {
    config.value.dateRange = val ?? [Date.now(), Date.now()]
    config.value.isFetchAll = false
  },
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-black!">
      请选择要存档的范围，默认为所有微博
    </p>

    <n-date-picker
      v-model:value="dateRange"
      type="daterange"
      clearable
    />

    <div class="center flex-wrap justify-start gap-2">
      <n-checkbox
        v-model:checked="config.largePic"
        label="导出原图"
      />
      <n-checkbox
        v-model:checked="config.hasComment"
        label="包含评论"
      />
      <n-checkbox
        v-model:checked="config.hasRepost"
        label="包含转发的微博"
      />
      <n-checkbox
        v-show="config.hasRepost"
        v-model:checked="config.repostPic"
        label="导出转发的图片"
      />
      <button
        class="py-1 btn bg-#18a058! hover:bg-green-7!"
        @click="() => {
          config.isFetchAll = true
        }"
      >
        重置为所有微博
      </button>
    </div>

    <div
      v-show="config.hasComment"
      class="flex items-center gap-4"
    >
      <span>要获取的评论数（最多20条）</span>
      <n-input-number
        v-model="config.commentCount"
        :default-value="6"
        :min="0"
        :max="20"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('./reset.css');
</style>
