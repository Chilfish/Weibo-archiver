<script setup lang="ts">
import type { UploadCustomRequestOptions } from '@workspace/core'
import { useStorage } from '@vueuse/core'
import { exportData, imgCdn, parseAndImport, useMessage, usePostStore, usePublicStore } from '@workspace/core'
import { NButton, NForm, NFormItem, NInput, NPopconfirm, NRadio, NRadioGroup, NSwitch, NUpload } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Theme from '../Theme.vue'

const useLocalImage = useStorage('imgHost', '/')
const customimgHost = useStorage('customimgHost', '')

const postStore = usePostStore()
const publicStore = usePublicStore()

const router = useRouter()
const message = useMessage()
const coverMode = ref(false)
const fileList = ref<any>([])
const isExporting = ref(false)
const isImporting = ref(false)

const username = computed(() => `@${publicStore.curUser?.name || '该用户'}`)

function onImportData({ file }: UploadCustomRequestOptions) {
  const data = file.file as File
  isImporting.value = true

  const reader = new FileReader()
  reader.readAsText(data)
  reader.onload = async () => {
    const content = reader.result as string
    const _data = content.replace('export const _ = ', '')

    try {
      await parseAndImport(_data)
    }
    catch (e) {
      message.error('导入失败，请检查文件内容是否正确')
      console.error('导入失败', e)
    }
    finally {
      // 确保只有一个文件
      fileList.value = []
      isImporting.value = false
    }
  }
}

async function exportDatas() {
  isExporting.value = true
  const data = await postStore.getAll()
  await exportData(data, publicStore.curUser)
  isExporting.value = false
}

async function clearData() {
  try {
    await postStore.clearDB()
    publicStore.rmUser()

    message.success('清空成功')
    router.push('/')
  }
  catch (e) {
    console.error(`清空失败: ${e}`)
    message.error('清空失败')
  }
}
</script>

<template>
  <main
    class="flex flex-col items-start gap-4"
  >
    <NForm>
      <NFormItem
        label="图片链接"
      >
        <NRadioGroup
          v-model:value="useLocalImage"
          class="flex flex-col gap-2"
        >
          <NRadio value="/">
            使用本地图片链接（需预先下载图片）
          </NRadio>
          <NRadio :value="imgCdn">
            使用默认的 CDN（{{ imgCdn }}）
          </NRadio>

          <NRadio value="weibo">
            使用微博原图（需配合
            <a
              href="https://chromewebstore.google.com/detail/header-editor/eningockdidmgiojffjmkdblpjocbhgh"
              target="_blank"
              title="插件市场"
            >
              Header Editor
            </a>
            插件）
          </NRadio>

          <div>
            <NRadio :value="customimgHost">
              使用自建图床链接（指向图片所在的目录）
            </NRadio>
            <NInput
              v-model:value="customimgHost"
              class="mt-2 max-w-80%"
              placeholder="请输入"
            >
              <template #prefix>
                <i class="i-tabler:link icon" />
              </template>
            </NInput>
          </div>
        </NRadioGroup>
      </NFormItem>

      <NFormItem
        label="外观模式"
      >
        <Theme />
      </NFormItem>
    </NForm>

    <div class="w-full flex flex-col gap-3">
      <p class="settings-title">
        导入/导出 数据
      </p>

      <div class="min-w-fit">
        <span class="mr-4">
          导入方式：{{ coverMode ? '覆盖模式（将覆盖本地所有数据）' : '合并模式（只追加合并新数据）' }}
        </span>
        <NSwitch
          v-model:value="coverMode"
        />
      </div>

      <div class="flex flex-wrap items-center gap-6">
        <NUpload
          v-model:file-list="fileList"
          :custom-request="onImportData"
          :show-file-list="false"
          accept=".mjs,.json"
          directory-dnd
          class="w-fit"
        >
          <NButton
            :loading="isImporting"
          >
            点击导入
          </NButton>
        </NUpload>

        <NButton
          class="w-fit"
          :loading="isExporting"
          @click="exportDatas"
        >
          点击导出
        </NButton>

        <NPopconfirm
          @positive-click="clearData"
        >
          <template #trigger>
            <NButton
              :bordered="false"
              class="w-fit text-white bg-red! hover:bg-red-500!"
              type="error"
            >
              清空本地数据
            </NButton>
          </template>
          <p>
            确认将
            <strong> {{ username }} </strong>
            的本地数据清空？你仍可以通过导入功能恢复数据。
          </p>
        </NPopconfirm>
      </div>
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
