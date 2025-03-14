<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { config } from '../composables/useConfig'
import Github from './icon/Github.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const {
  VITE_APP_VERSION,
} = import.meta.env

// https://daisyui.com/docs/themes/
const THEMES = [
  'light',
  'system',
  'cupcake',
  'dark',
  'emerald',
  'valentine',
  'lofi',
  'dracula',
  'cmyk',
  'business',
  'winter',
] as const
</script>

<template>
  <div class="modal-box p-3">
    <h3 class="flex items-center gap-2 pb-4">
      <button
        class="btn-ghost btn-circle btn"
        @click="emit('close')"
      >
        <X />
      </button>

      <span class="text-lg font-bold">
        Settings
      </span>
    </h3>

    <label class="label text-sm font-semibold">
      通用
    </label>

    <div class="bg-base-200 card my-2 rounded-lg p-2 shadow-sm">
      <div class="cell">
        <label>主题</label>
        <select
          v-model="config.theme"
          class="select select-bordered w-fit"
        >
          <option
            v-for="theme in THEMES"
            :key="theme"
            :value="theme"
          >
            {{ theme }}
          </option>
        </select>
      </div>
    </div>

    <label class="label text-sm font-semibold">
      关于
    </label>
    <div class="card bg-base-200 my-2 rounded-lg p-2 shadow-sm">
      <div class="cell">
        <div>
          版本
          <div
            v-if="VITE_APP_VERSION"
            class="badge badge-primary badge-soft ml-2"
          >
            v{{ VITE_APP_VERSION }}
          </div>
        </div>

        <a
          class="btn-ghost btn-circle w-fit px-2 btn text-primary!"
          href="https://github.com/Chilfish/Weibo-archiver"
          target="_blank"
        >
          <Github />

          Github
        </a>
      </div>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</template>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0.2rem;
}
</style>
