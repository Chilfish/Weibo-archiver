<script setup lang="ts">

</script>

<template>
  <app-main>
    <n-modal-provider>
      <main-header />

      <router-view>
        <!-- <transition name="fade">
          <component :is="Component" />
        </transition> -->
      </router-view>

      <img-viewer />
    </n-modal-provider>
  </app-main>
</template>
