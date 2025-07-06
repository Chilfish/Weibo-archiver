<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const query = ref('')
async function onSearch() {
  console.log(query.value)
}
</script>

<template>
  <label
    class="input rounded-xl bg-base-200 border-[1px]"
  >
    <input
      id="search-weibo"
      v-model="query"
      type="search"
      required
      placeholder="搜索微博内容..."
      @keyup.enter="onSearch"
    >
    <SearchIcon
      class="h-[1em] cursor-pointer"
      @click="onSearch"
    />
  </label>
</template>
