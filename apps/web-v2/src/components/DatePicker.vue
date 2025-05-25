<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import {
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import CalendarView from './CalendarView.vue'

const props = withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false,
})

const value = defineModel<DateValue | undefined>('value')
const df = new DateFormatter('zh-CN', {
  dateStyle: 'long',
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-fit justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
        :disabled="props.disabled"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "请选一个日期" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <CalendarView v-model="value" />
    </PopoverContent>
  </Popover>
</template>
