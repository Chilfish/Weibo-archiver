<script setup lang="ts">
import type { UploadCustomRequestOptions } from 'naive-ui'
import { destr } from 'destr'

import { saveAs } from 'file-saver'

const useLocalImage = useStorage('imgHost', '/')
const customimgHost = useStorage('customimgHost', '')

const postStore = usePostStore()
const message = useMessage()
const coverMode = ref(false)

function onImportData({ file }: UploadCustomRequestOptions) {
  const data = file.file as File
  const reader = new FileReader()
  reader.readAsText(data)
  reader.onload = () => {
    const content = reader.result as string
    const data = content.replace('export const _ = ', '')

    try {
      postStore.set(destr(data, { strict: true }), coverMode.value)
      message.success('导入成功')
    }
    catch (e) {
      message.error('导入失败，请检查文件内容是否正确')
      console.error(`导入失败: ${e}`)
    }
  }
}

function exportData() {
  const data = postStore.posts
  const blob = new Blob(
    [`export const _ = ${JSON.stringify(data)}`],
    { type: 'text/plain' },
  )

  saveAs(blob, 'data.mjs')
  message.success('导出成功')
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
      <p class="text-3.5 text-gray">
        导入从脚本导出的 <code>data.mjs</code> 数据文件
      </p>

      <div class="my-4">
        <span>
          {{ coverMode ? '覆盖模式（将覆盖本地所有数据）' : '合并模式（只追加合并新数据）' }}
        </span>
        <n-switch
          v-model:value="coverMode"
        />
      </div>
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

    <div class="flex flex-col">
      <p class="settings-title">
        导出数据
      </p>
      <p class="text-3.5 text-gray">
        导出当前数据到 <code>data.mjs</code> 数据文件
      </p>

      <n-button
        class="mt-4 w-fit"
        @click="exportData"
      >
        点击导出
      </n-button>
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
