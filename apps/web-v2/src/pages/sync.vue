<script setup lang="ts">
import SyncHeader from '@/components/sync/SyncHeader.vue'
import SyncOptions from '@/components/sync/SyncOptions.vue'
import SyncSearchUser from '@/components/sync/SyncSearchUser.vue'
import SyncStates from '@/components/sync/SyncStates.vue'
import SyncTips from '@/components/sync/SyncTips.vue'
</script>

<template>
  <main
    class="flex flex-col gap-6 items-center justify-center mx-auto sm:w-[60vw] "
  >
    <SyncHeader />
    <SyncSearchUser />
    <SyncOptions />
    <SyncStates />
    <SyncTips />
  </main>
</template>
