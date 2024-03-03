<script setup lang="ts">

</script>

<template>
  <app-main>
    <n-modal-provider>
      <nuxt-loading-indicator />
      <main-header />
      <img-viewer />
      <main class="mt-16 h-full">
        <slot />
      </main>
    </n-modal-provider>
  </app-main>
</template>
