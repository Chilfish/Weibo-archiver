<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfigStore } from './stores'

const { config } = storeToRefs(useConfigStore())

const dateRange = computed({
  get() {
    const { startAt, endAt } = config.value
    return [startAt, endAt] as [number, number]
  },
  set(val: [number, number]) {
    config.value.startAt = val[0] || Date.now()
    config.value.endAt = val[1] || Date.now()
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

    <div
      v-if="!config.followingsOnly"
      class="center flex-wrap justify-start gap-2"
    >
      <n-checkbox
        v-model:checked="config.largePic"
        label="导出原图"
        size="small"
      />
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-checkbox
            v-model:checked="config.hasComment"
            label="包含评论"
            size="small"
          />
        </template>
        包含评论将会减慢速度
      </n-tooltip>
      <n-checkbox
        v-model:checked="config.hasRepost"
        label="包含转发的微博"
        size="small"
      />
      <n-checkbox
        v-show="config.hasRepost"
        v-model:checked="config.repostPic"
        label="导出转发的图片"
        size="small"
      />

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-checkbox
            v-model:checked="config.restore"
            label="继续上次的记录"
            size="small"
          />
        </template>
        默认开始前都会清空之前的状态
      </n-tooltip>

      <button
        class="py-1 text-3.5 btn bg-#18a058! hover:bg-green-7!"
        @click="() => {
          config.isFetchAll = true
        }"
      >
        重置为所有微博
      </button>
    </div>

    <div>
      <n-checkbox
        v-if="!config.weiboOnly"
        v-model:checked="config.followingsOnly"
        label="只导出关注列表"
        size="small"
      />
      <n-checkbox
        v-if="!config.followingsOnly"
        v-model:checked="config.weiboOnly"
        label="只导出微博"
        size="small"
      />
    </div>

    <div
      v-show="config.hasComment"
      class="flex items-center gap-4"
    >
      <span>要获取的评论数（最多20条）</span>
      <n-input-number
        v-model="config.commentCount"
        size="small"
        class="w-26"
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
