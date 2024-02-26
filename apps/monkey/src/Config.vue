<script setup lang="ts">
import { useConfigStore } from './stores'

const configStore = useConfigStore()

const dateRange = computed({
  get() {
    return configStore.state.dateRange
  },
  set(val: [number, number]) {
    configStore.state.dateRange = val ?? []
  },
})

configStore.setConfig({ now: Date.now() })
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
      <button
        class="bg-#18a058 py-1 btn hover:bg-green-7"
        @click="() => {
          const { now } = configStore.state
          dateRange = [now, now]
        }"
      >
        重置为所有微博
      </button>
      <n-checkbox
        v-model:checked="configStore.state.picLarge"
        label="导出原图"
      />
      <n-checkbox
        v-model:checked="configStore.state.comment"
        label="包含评论"
      />
      <n-checkbox
        v-model:checked="configStore.state.repost"
        label="包含转发的微博"
      />
      <n-checkbox
        v-show="configStore.state.repost"
        v-model:checked="configStore.state.repostPic"
        label="同时也导出转发微博的图片"
      />
    </div>

    <div
      v-show="configStore.state.comment"
      class="flex items-center gap-4"
    >
      <span>要获取的评论数（最多15条）</span>
      <n-input-number
        v-model="configStore.state.commentCount"
        :default-value="10"
        :min="0"
        :max="15"
      />
    </div>
  </div>
</template>
