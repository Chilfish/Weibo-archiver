<script setup lang="ts">

</script>

<template>
  <app-main>
    <n-modal-provider>
      <client-only>
        <main-header />
      </client-only>
      <img-viewer />
      <main class="mt-12 h-full">
        <slot />
      </main>
    </n-modal-provider>
  </app-main>
</template>
