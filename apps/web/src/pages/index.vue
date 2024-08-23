<script setup lang="ts">
const showSettings = ref(false)
</script>

<template>
  <n-modal
    v-model:show="showSettings"
    preset="dialog"
    :show-icon="false"
  >
    <SettingsWeb />
  </n-modal>

  <main
    class="center-col gap-6 p-4"
    sm="flex-row min-h-90vh gap-32"
  >
    <div class="sm:ml-16">
      <settings-about :show-donate="false" />

      <div class="mt-6 center gap-4">
        <button
          class="rounded-3 p-4 font-bold btn"
          @click="showSettings = true"
        >
          开始导入数据
        </button>

        <router-link
          class="rounded-3 bg-p-3 p-4 text-white font-bold"
          hover="bg-p-1 text-white"
          to="/post"
        >
          查看已有数据
        </router-link>
      </div>
    </div>

    <n-image
      class="sm:w-1/2"
      preview-disabled
      src="https://p.chilfish.top/weibo/cover.webp"
      alt="features"
      :img-props="{
        class: 'rounded-2! shadow-lg',
      }"
    />
  </main>
</template>
