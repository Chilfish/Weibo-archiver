<script setup lang="ts">
import { computed } from 'vue'
import { useEmoji } from '@/composables'

const props = defineProps<{
  emojiPhrase: string
}>()

const { getEmojiUrl } = useEmoji()

const emoji = computed(() => getEmojiUrl(props.emojiPhrase))
</script>

<template>
  <img
    v-if="emoji"
    :src="emoji"
    :alt="emojiPhrase"
    class="w-5 h-5 inline-block mx-1"
  >
  <span
    v-else
    class="inline-block"
  >
    {{ emojiPhrase }}
  </span>
</template>
