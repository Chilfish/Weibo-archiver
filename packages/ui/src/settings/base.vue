<script setup lang="ts">
import type { UploadCustomRequestOptions } from 'naive-ui'
import { destr } from 'destr'

const useLocalImage = useStorage('imgHost', '/')
const customimgHost = useStorage('customimgHost', '')

const postStore = usePostStore()
const message = useMessage()

function onImportData({ file }: UploadCustomRequestOptions) {
  const data = file.file as File
  const reader = new FileReader()
  reader.readAsText(data)
  reader.onload = () => {
    const content = reader.result as string
    const data = content.replace('export const _ = ', '')

    try {
      postStore.set(destr(data, { strict: true }))
      message.success('导入成功')
    }
    catch (e) {
      message.error('导入失败，请检查文件内容是否正确')
      console.error(`导入失败: ${e}`)
    }
  }
}
</script>

<template>
  <main
    class="flex flex-col items-start gap-4 overflow-auto"
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

    <div class="flex flex-col">
      <p class="settings-title">
        导入数据
      </p>
      <p class="text-3 text-gray">
        导入从脚本导出的 <code>data.mjs</code> 文件
      </p>

      <n-upload
        :custom-request="onImportData"
        :max="1"
        directory-dnd
        accept=".mjs"
      >
        <n-button>
          点击导入
        </n-button>
      </n-upload>
    </div>

    <slot />
  </main>
</template>

<style>
label.n-form-item-label span,
.settings-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

div.n-form-item-blank {
  margin-left: 1rem;
}
</style>
