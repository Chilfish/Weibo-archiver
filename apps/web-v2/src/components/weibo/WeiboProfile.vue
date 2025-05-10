<script setup lang="ts">
import type { PostMeta, User } from '@weibo-archiver/core'
import { useUserStore } from '@/stores'
import { formatDate } from '@weibo-archiver/shared'
import { computed } from 'vue'
import Avatar from '../common/Avatar.vue'

const props = defineProps<{
  meta: PostMeta
  user?: User
}>()

const userStore = useUserStore()

const user = computed(() => props.user || userStore.curUser)
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
        {{ formatDate(meta.createdAt) }}
      </div>
    </div>

    <div class="flex items-center ml-auto text-xs text-base-content/80 gap-2">
      <a
        :href="`https://weibo.com/detail/${meta.id}`"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-primary hidden group-hover:block select-none"
      >
        跳转到原微博
      </a>

      <span>
        {{ meta.regionName }}
      </span>
    </div>
  </div>
</template>
