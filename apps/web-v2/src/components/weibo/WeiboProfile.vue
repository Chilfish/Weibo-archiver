<script setup lang="ts">
import type { Meta } from '@workspace/shared'
import { usePublicStore } from '@workspace/core'
import { formatDate } from '@workspace/shared'
import { computed } from 'vue'
import LazyImage from '../common/LazyImage.vue'

defineProps<{
  meta: Meta
}>()

const publicStore = usePublicStore()

const user = computed(() => publicStore.curUser)
</script>

<template>
  <div
    v-if="user"
    class="flex items-start gap-3 mb-4"
  >
    <LazyImage
      :src="user.avatar"
      :alt="user.name"
      class="w-10 h-10 rounded-full object-cover"
      skeleton-class="w-10 h-10"
    />
    <div>
      <h3 class="font-bold text-gray-900">
        {{ user.name }}
      </h3>
      <div class="text-xs text-gray-500">
        {{ formatDate(meta.created_at) }}
      </div>
    </div>

    <div class="flex items-center ml-auto text-xs text-gray-500 gap-2">
      <a
        :href="meta.detail_url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-primary hidden group-hover:block select-none"
      >
        跳转到原微博
      </a>

      <span>
        {{ meta.region_name }}
      </span>
    </div>
  </div>
</template>
