<script setup lang="ts">
import { Label } from '../label'
import { Checkbox } from './'

interface Props {
  id: string
  label: string
  checked?: boolean
  modelValue?: boolean
  class?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:checked', 'update:modelValue'])

const updateValue = (val: boolean) => {
  emit('update:checked', val)
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox
      :id="id"
      :checked="checked || modelValue"
      :class="props.class"
      @update:checked="updateValue"
    />
    <Label :for="id">
      {{ label }}
    </Label>
  </div>
</template>
