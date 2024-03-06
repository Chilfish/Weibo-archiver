<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { users, curUid } = storeToRefs(usePublicStore())

const otherUsers = computed(() => users.value.filter(user => user.uid !== curUid.value))
const curUser = computed(() => users.value.find(user => user.uid === curUid.value))
</script>

<template>
  <div
    class=""
  >
    {{ curUser }}
    {{ otherUsers }}
  </div>
</template>
