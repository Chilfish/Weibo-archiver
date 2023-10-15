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
  </div>
</template>
