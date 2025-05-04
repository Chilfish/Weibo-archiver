<script setup lang="ts">
import type { Meta, User } from '@weibo-archiver/core'
import { usePublicStore } from '@weibo-archiver/core'
import { formatDate } from '@weibo-archiver/shared'
import { computed } from 'vue'
import Avatar from '../common/Avatar.vue'

const props = defineProps<{
  meta: Meta
  user?: User
}>()

const publicStore = usePublicStore()

const user = computed(() => props.user || publicStore.curUser)
</script>

<template>
  <div
    v-if="user"
    class="flex items-start gap-3 mb-4"
  >
    <Avatar
      :src="user.avatar"
      :alt="user.name"
      :size="10"
    />
    <div>
      <h3 class="font-bold text-base-content">
        {{ user.name || '未知' }}
      </h3>
      <div class="text-xs text-base-content/80">
        {{ formatDate(meta.created_at) }}
      </div>
    </div>

    <div class="flex items-center ml-auto text-xs text-base-content/80 gap-2">
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
