<script setup lang="ts">
const postStore = usePostStore()
onMounted(async () => {
  const ids = await indexDB.getItem<string[]>('ids')
  postStore.ids = ids ?? []
  postStore.total = ids?.length ?? 0
})
</script>

<template>
  <main>
    <!-- TODO: for debug -->
    <!-- <n-dialog
      :show-icon="false"
      title=" "
      class="m-16"
    >
      <SettingsWeb />
    </n-dialog> -->

    <Preview
      v-if="postStore.ids.length > 0"
    />
  </main>
</template>
