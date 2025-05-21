<script setup lang="ts">
import { ref } from 'vue'
import AboutSettings from './AboutSettings.vue'
import GeneralSettings from './GeneralSettings.vue'
import SettingsHeader from './SettingsHeader.vue'
import SettingsSidebar from './SettingsSidebar.vue'

defineEmits<{
  close: []
}>()

const activeTab = ref('general')
</script>

<template>
  <div class="w-[90vw] sm:w-3xl">
    <SettingsHeader @close="$emit('close')" />

    <div class="flex">
      <SettingsSidebar
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
      />

      <div class="flex-grow p-6 overflow-y-auto max-h-[76vh]">
        <GeneralSettings v-if="activeTab === 'general'" />
        <AboutSettings v-else-if="activeTab === 'about'" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
