<script setup lang="ts">

</script>

<template>
  <app-main>
    <nuxt-loading-indicator />
    <main-header />
    <img-viewer />
    <main class="mt-16 h-full">
      <slot />
    </main>
  </app-main>
</template>
