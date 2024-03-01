<script setup lang="ts">
const useLocalImage = useStorage('useCdn', false)
</script>

<template>
  <main
    class="w-60vw flex flex-col items-start gap-4"
  >
    <div class="center gap-2">
      使用远程图片
      <n-switch
        v-model:value="useLocalImage"
        size="small"
      />
    </div>
    <Dark />
  </main>
</template>
