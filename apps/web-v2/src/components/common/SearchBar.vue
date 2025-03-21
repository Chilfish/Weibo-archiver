<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'

const query = ref('')
async function onSearch() {
  console.log(query.value)
}
</script>

<template>
  <label
    class="input rounded-xl"
  >
    <input
      id="search-weibo"
      v-model="query"
      type="search"
      required
      placeholder="搜索微博内容..."
      @keyup.enter="onSearch"
    >
    <Search
      class="h-[1em] cursor-pointer"
      @click="onSearch"
    />
  </label>
</template>
