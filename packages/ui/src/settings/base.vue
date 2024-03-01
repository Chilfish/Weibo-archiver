<script setup lang="ts">
import type { UploadCustomRequestOptions } from 'naive-ui'
import type { Post } from '@types'
import { clear as clearDB, getMany } from 'idb-keyval'
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
  reader.onload = async () => {
    const content = reader.result as string
    const data = content.replace('export const _ = ', '')

    try {
      const posts = destr<Post[]>(data, { strict: true })
      await postStore.set(posts, coverMode.value)

      useStorage('meta', {
        uid: posts[0]?.user?.id,
        name: posts[0]?.user?.screen_name,
      })

      message.success(`导入成功，共导入 ${posts.length} 条数据`)
    }
    catch (e) {
      message.error('导入失败，请检查文件内容是否正确')
      console.error(`导入失败: ${e}`)
    }
  }
}

async function exportData() {
  const data = await getMany(postStore.ids).then(res => res)
  if (!data[0]) {
    message.warning('没有数据可以导出')
    return
  }

  const blob = new Blob(
    [JSON.stringify(data)],
    { type: 'text/plain' },
  )

  saveAs(blob, 'weibo-data.json')
  message.success('导出成功')
}
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

    <div class="w-full flex flex-col">
      <p class="settings-title">
        导入/导出 数据
      </p>

      <div class="my-4 min-w-fit">
        <span class="mr-4">
          导入方式：{{ coverMode ? '覆盖模式（将覆盖本地所有数据）' : '合并模式（只追加合并新数据）' }}
        </span>
        <n-switch
          v-model:value="coverMode"
        />
      </div>

      <div class="flex flex-wrap items-center gap-6">
        <n-upload
          :custom-request="onImportData"
          :show-file-list="false"
          accept=".mjs,.json"
          directory-dnd
          class="w-fit"
        >
          <n-button>
            点击导入
          </n-button>
        </n-upload>

        <n-button
          class="w-fit"
          @click="exportData"
        >
          点击导出
        </n-button>

        <n-popconfirm
          @positive-click="async () => {
            clearDB().then(() => {
              message.success('清空成功')
            }).catch((e) => {
              console.error(`清空失败: ${e}`)
              message.error('清空失败')
            })
          }"
        >
          <template #trigger>
            <n-button
              class="w-fit bg-red"
              type="error"
            >
              清空本地数据
            </n-button>
          </template>
          确认清空本地数据？你仍可以通过导入功能恢复数据。
        </n-popconfirm>
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
