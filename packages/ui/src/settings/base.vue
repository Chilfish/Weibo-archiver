<script setup lang="ts">
import type { UploadCustomRequestOptions } from 'naive-ui'
import type { Post } from '@types'
import { destr } from 'destr'
import { useStorage } from '@vueuse/core'

const useLocalImage = useStorage('imgHost', '/')
const customimgHost = useStorage('customimgHost', '')

const postStore = usePostStore()
const publicStore = usePublicStore()

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
    const data = content.replace('export const _ = ', '')

    try {
      const posts = destr<Post[]>(data, { strict: true })
      const owner = posts[0]?.user.id

      publicStore.curUid = owner
      await postStore.set(posts, coverMode.value)

      const user = publicStore.users.find(u => u.uid === owner)
      if (user === undefined)
        message.warning('暂无该用户的更多信息，请先在脚本页中点击 同步信息 后刷新本页')
      else
        user.postCount = postStore.total

      publicStore.curUid = owner
      isImporting.value = false

      message.success(`导入成功，导入后共有 ${postStore.total} 条数据`)
    }
    catch (e) {
      message.error('导入失败，请检查文件内容是否正确')
      console.error(`导入失败: ${e}`)
    }
    finally {
      // 确保只有一个文件
      fileList.value = []
    }
  }
}

async function exportDatas() {
  isExporting.value = true
  const data = await postStore.getAll()
  await exportData(data)
  isExporting.value = false
}

async function clearData() {
  try {
    postStore.clearDB()
    publicStore.rmUser()

    message.success('清空成功')
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

    <div class="w-full flex flex-col gap-3">
      <p class="settings-title">
        导入/导出 数据
      </p>

      <div class="min-w-fit">
        <span class="mr-4">
          导入方式：{{ coverMode ? '覆盖模式（将覆盖本地所有数据）' : '合并模式（只追加合并新数据）' }}
        </span>
        <n-switch
          v-model:value="coverMode"
        />
      </div>

      <div class="flex flex-wrap items-center gap-6">
        <n-upload
          v-model:file-list="fileList"
          :custom-request="onImportData"
          :show-file-list="false"
          accept=".mjs,.json"
          directory-dnd
          class="w-fit"
        >
          <n-button
            :loading="isImporting"
          >
            点击导入
          </n-button>
        </n-upload>

        <n-button
          class="w-fit"
          :loading="isExporting"
          @click="exportDatas"
        >
          点击导出
        </n-button>

        <n-popconfirm
          @positive-click="clearData"
        >
          <template #trigger>
            <n-button
              :bordered="false"
              class="w-fit text-white bg-red! hover:bg-red-500!"
              type="error"
            >
              清空本地数据
            </n-button>
          </template>
          <p>
            确认将
            <strong> {{ username }} </strong>
            的本地数据清空？你仍可以通过导入功能恢复数据。
          </p>
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
