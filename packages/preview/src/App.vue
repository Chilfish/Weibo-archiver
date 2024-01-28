<script setup lang="ts">

</script>

<template>
  <app-main>
    <ui-header />

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>

    <img-viewer />
  </app-main>
</template>
