<script setup lang="ts">
const postStore = usePostStore()
const loaded = ref(false)
onMounted(async () => {
  const ids = await indexDB.getItem<string[]>('ids')
  postStore.ids = ids ?? []
  postStore.total = ids?.length ?? 0
  loaded.value = true
})

// window.$message = useMessage()
</script>

<template>
  <n-spin
    v-if="!loaded"
    class="center"
    size="large"
  />

  <Preview
    v-if="postStore.ids.length > 0"
  />

  <div
    v-else
    class="pt-12"
  >
    <settings-about />
    <p
      class="pt-6 font-bold"
      text="center xl"
    >
      暂没微博数据，点击右上角设置来导入吧👋
    </p>
  </div>
</template>
