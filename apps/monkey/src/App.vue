<script setup lang="ts">
import FetchStats from '@/component/configs/FetchStats.vue'
import { onBeforeMount } from 'vue'
import Options from './component/configs/Options.vue'
import SearchUser from './component/configs/SearchUser.vue'
import StartButton from './component/configs/StartButton.vue'
import Header from './component/Header.vue'
import Logo from './component/Logo.vue'
import { config, useConfig } from './composables/useConfig'
import { usePost } from './composables/usePost'

const { toggleMinimize } = useConfig()

const postStore = usePost()

onBeforeMount(async () => {
  await postStore.initializeDB()
})
</script>

<template>
  <div
    v-show="!config.isMinimize"
    class="fixed-card bg-base-200 text-base-content max-h-[80vh] w-96 gap-2 overflow-x-hidden overflow-y-auto border-2 border-gray-200 rounded-lg p-4 shadow-2xl space-y-2"
    :data-theme="config.theme"
  >
    <Header />
    <SearchUser />
    <Options />
    <FetchStats />
    <StartButton />
  </div>

  <Logo
    v-show="config.isMinimize"
    class="fixed-card h-12 w-12 border-2 border-gray-200 rounded-lg shadow-2xl"
    @click="toggleMinimize"
  />
</template>

<style>
#plugin-app {
  z-index: 100;
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 15px;

}

.fixed-card {
  position: fixed;
  right: 1rem;
  top: 5rem;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
}

.fixed-card::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.fixed-card::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: transparent;
}
.fixed-card::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #7a797963;
}
.fixed-card {
  scrollbar-width: thin !important;
}
</style>
