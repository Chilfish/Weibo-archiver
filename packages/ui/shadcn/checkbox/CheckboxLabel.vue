<script setup lang="ts">
import { Label } from '../label'
import { Checkbox } from './'

interface Props {
  id: string
  label: string
  class?: string
}

const props = defineProps<Props>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <div class="sd-checkbox-label">
    <Checkbox
      :id="id"
      v-model="model"
      :class="props.class"
    />
    <Label :for="id" class="cursor-pointer select-none text-sm">
      {{ label }}
    </Label>
  </div>
</template>

<style>
.sd-checkbox-label {
  @apply flex items-center gap-3 hover:opacity-90;
}
</style>
