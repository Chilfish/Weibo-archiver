<script setup lang="ts">

</script>

<template>
  <app-main>
    <nuxt-loading-indicator />
    <main-header />
    <client-only>
      <img-viewer />
    </client-only>
    <main class="mt-16 h-full">
      <slot />
    </main>
  </app-main>
</template>
