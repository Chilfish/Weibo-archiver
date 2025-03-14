<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  start: number
  end: number
  disabled?: boolean
}>(), {
  start: Date.now(),
  end: Date.now(),
  disabled: false,
})

const emit = defineEmits<{
  change: [number, number]
  error: [string]
}>()
const startAt = ref(props.start)
const endAt = ref(props.end)

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const maxDate = toInputDate(tomorrow.getTime())

watch([startAt, endAt], ([_startAt, _endAt]) => {
  const start = new Date(_startAt).getTime() || Date.now()
  let end = new Date(_endAt).getTime() || Date.now()
  if (start > end) {
    end = start
    endAt.value = startAt.value
    emit('error', '结束时间不能小于开始时间')
  }

  emit('change', start, end)
})

function toInputDate(date: number) {
  return new Date(date).toISOString().split('T')[0]
}
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <input
      :value="toInputDate(start)"
      :max="maxDate"
      type="date"
      class="input"
      :disabled="disabled"
      @change="(e) => {
        startAt = new Date((e.target as HTMLInputElement).value).getTime()
      }"
    >
    <span>
      ~
    </span>
    <input
      :value="toInputDate(end)"
      :max="maxDate"
      type="date"
      class="input"
      :disabled="disabled"
      @change="(e) => {
        endAt = new Date((e.target as HTMLInputElement).value).getTime()
      }"
    >
  </div>
</template>
