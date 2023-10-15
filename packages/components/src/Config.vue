<script setup lang="ts">
const configStore = useConfigStore()

const dateRange = computed({
  get() {
    return configStore.state.dateRange
  },
  set(val: Date[] | null) {
    configStore.state.dateRange = val ?? []
  },
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <p>请选择要存档的范围，默认为从头到尾</p>

    <!-- @vue-expect-error -->
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      range-separator="到"
      :shortcuts="shortcuts"
    />

    <div class="center flex-wrap justify-start gap-2">
      <el-checkbox
        v-model="configStore.state.picLarge"
        label="下载原图"
      />
      <el-checkbox
        v-model="configStore.state.comment"
        label="包含评论"
      />
      <el-checkbox
        v-model="configStore.state.repost"
        label="包含转发的微博"
      />
      <el-checkbox
        v-show="configStore.state.repost"
        v-model="configStore.state.repostPic"
        label="同时也下载转发微博的图片"
      />
    </div>

    <div
      v-show="configStore.state.comment"
    >
      <span>要获取的评论数（最多15条）</span>
      <el-input-number
        v-model="configStore.state.commentCount"
        size="small"
        :min="0"
        :max="15"
      />
    </div>
  </div>
</template>
