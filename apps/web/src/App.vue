<script setup lang="ts">

</script>

<template>
  <app-main>
    <n-modal-provider>
      <main-header />
      <router-view class="mt-12" />

      <img-viewer />
    </n-modal-provider>
  </app-main>
</template>
