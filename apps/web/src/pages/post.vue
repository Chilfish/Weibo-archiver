<script setup lang="ts">
const hasPosts = ref(false)
</script>

<template>
  <main
    v-if="!hasPosts"
    class="min-h-90vh justify-center pt-12 sm:center"
  >
    <div class="sm:ml-16">
      <settings-about :show-donate="false" />

      <div
        class="py-6 text-center"
      >
        <p class="mb-2 text-xl font-bold">
          暂无微博数据，点击右上角设置来导入吧👋
        </p>
        <p>
          或者点击
          <RouterLink to="/example">
            这里
          </RouterLink>
          查看示例数据
        </p>
      </div>
    </div>

    <n-image
      class="mx-auto sm:w-1/2"
      preview-disabled
      src="https://p.chilfish.top/weibo/feature.webp"
      alt="features"
      :img-props="{
        class: 'rounded-2! shadow-lg',
      }"
    />
  </main>

  <client-only>
    <Preview
      v-model:hasPosts="hasPosts"
    />
  </client-only>
</template>
