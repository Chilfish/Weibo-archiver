<script setup lang="ts">
const postStore = usePostStore()
const loaded = ref(false)
onMounted(async () => {
  const ids = await indexDB.getItem<string[]>('ids')
  postStore.ids = ids ?? []
  postStore.total = ids?.length ?? 0
  loaded.value = true
})

window.$message = useMessage()
</script>

<template>
  <main v-if="loaded">
    <Preview
      v-if="postStore.ids.length > 0"
    />

    <div
      v-else
      class="pt-8"
    >
      <settings-about />
      <p
        class="pt-6 font-bold"
        text="center xl"
      >
        暂没微博数据，点击右上角设置来导入吧👋
      </p>
    </div>
  </main>

  <n-spin
    v-else
    class="center"
    size="large"
  />
</template>
