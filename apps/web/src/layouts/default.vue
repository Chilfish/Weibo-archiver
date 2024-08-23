<script setup lang="ts">
</script>

<template>
  <app-main>
    <nuxt-loading-indicator />
    <main-header />
    <client-only>
      <img-viewer />
    </client-only>
    <main class="pt-16">
      <slot />
    </main>
  </app-main>
</template>
