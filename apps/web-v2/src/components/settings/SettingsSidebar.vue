<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { Info, Settings } from 'lucide-vue-next'

defineProps<{
  activeTab: string
}>()

defineEmits<{
  'update:activeTab': [value: string]
}>()

interface SidebarItem {
  icon: FunctionalComponent
  label: string
  value: string
}

const sidebarItems: SidebarItem[] = [
  {
    icon: Settings,
    label: '通用',
    value: 'general',
  },
  {
    icon: Info,
    label: '关于',
    value: 'about',
  },
]
</script>

<template>
  <div class="w-36 border-r border-gray-200 flex flex-col shrink-0">
    <div
      v-for="item in sidebarItems"
      :key="item.value"
      class="py-3 px-5 cursor-pointer hover:bg-base-200 flex items-center gap-3"
      :class="{ 'bg-base-200 text-primary font-medium': activeTab === item.value }"
      @click="$emit('update:activeTab', item.value)"
    >
      <component :is="item.icon" class="w-5 h-5" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
