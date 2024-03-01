<script setup lang="ts">
const useLocalImage = useStorage('imgHost', '/')
const customimgHost = useStorage('customimgHost', '')
</script>

<template>
  <main
    class="flex flex-col items-start gap-4"
  >
    <n-form>
      <n-form-item
        label="图片链接"
      >
        <n-radio-group
          v-model:value="useLocalImage"
          class="flex flex-col gap-2"
        >
          <n-radio value="/">
            使用本地图片链接（需预先下载图片）
          </n-radio>
          <n-radio :value="imgCdn">
            使用默认的 CDN（{{ imgCdn }}）
          </n-radio>

          <n-radio :value="customimgHost">
            <span>
              使用自建图床链接（指向图片所在的目录）
            </span>
            <n-input
              v-model:value="customimgHost"
              class="mt-2"
              placeholder="请输入"
            >
              <template #prefix>
                <i class="i-tabler:link icon" />
              </template>
            </n-input>
          </n-radio>
        </n-radio-group>
      </n-form-item>

      <n-form-item
        label="外观模式"
      >
        <Theme />
      </n-form-item>
    </n-form>

    <slot />
  </main>
</template>

<style>
label.n-form-item-label span {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

div.n-form-item-blank {
  margin-left: 1rem;
}
</style>
