<script setup lang="ts">
</script>

<template>
  <main>
    <!-- TODO: for debug -->
    <!-- <n-dialog
      :show-icon="false"
      title="设置"
      class="m-16"
    >
      <SettingsWeb />
    </n-dialog> -->

    <Preview
      v-if="$route.params.page"
    />
  </main>
</template>
