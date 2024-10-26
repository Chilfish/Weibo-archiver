<script setup lang="ts">
import type { Post, PostData, UserBio, UserInfo } from '@shared'
import { imgCdn } from '@core/constants'
import { parseOldPost } from '@shared'
import { useStorage } from '@vueuse/core'
import { destr } from 'destr'
import { type UploadCustomRequestOptions, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

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

/**
 * 判断是否为多行 JSON，以\n分隔的对象
 * ```
 * {}
 * {}
 * ```
 */
function isMutilLineJson(content: string) {
  const lines = content.split('\n').filter(Boolean)

  // 只检查第一行和最后一行
  return lines.length > 1
    && lines[0].startsWith('{')
    && lines[lines.length - 1].startsWith('{')
}

function parseMultiLineJson(content: string) {
  const lines = content.split('\n').filter(Boolean)
  return lines.map(line => destr<Post>(line, { strict: true }))
}

async function paeseAndImport(_data: string) {
  const data = isMutilLineJson(_data)
    ? parseMultiLineJson(_data)
    : destr<PostData | Post[]>(_data, { strict: true })

  let user: UserInfo
  let posts: Post[]
  let followings: UserBio[] = []

  if (Array.isArray(data)) {
    // 来自 cli 的多行json
    if (!data[0].user?.uid) {
      posts = data
      user = publicStore.curUser as UserInfo

      message.warning('正在导入来自 cli 的数据，将使用当前用户信息')
    }
    else {
      posts = data.map(post => parseOldPost(post))

      const _user = data[0].user as any
      // @ts-expect-error bad
      user = publicStore.users.find(u => u.uid === _user?.id)
      if (!user) {
        user = {
          uid: _user.id,
          name: _user.screen_name,
          avatar: _user.profile_image_url,
          postCount: posts.length,
          followers: 0,
          followings: 0,
          bio: '',
          birthday: '',
          createdAt: '',
        }
      }
    }
  }
  else {
    posts = data.weibo
    user = data.user
    followings = data.followings
  }
  user = toRaw(user)

  publicStore.importUser(user)

  await postStore.set(posts, user, followings, coverMode.value)
  user.postCount = postStore.total

  message.success(`导入成功，导入后共有 ${postStore.total} 条数据`)
  router.push('/post')
}

function onImportData({ file }: UploadCustomRequestOptions) {
  const data = file.file as File
  isImporting.value = true

  const reader = new FileReader()
  reader.readAsText(data)
  reader.onload = async () => {
    const content = reader.result as string
    const _data = content.replace('export const _ = ', '')

    try {
      await paeseAndImport(_data)
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

          <n-radio value="weibo">
            使用微博原图（需配合
            <a
              href="https://chromewebstore.google.com/detail/header-editor/eningockdidmgiojffjmkdblpjocbhgh"
              target="_blank"
              title="插件市场"
            >
              Header Editor
            </a>
            插件）
          </n-radio>

          <div>
            <n-radio :value="customimgHost">
              使用自建图床链接（指向图片所在的目录）
            </n-radio>
            <n-input
              v-model:value="customimgHost"
              class="mt-2 max-w-80%"
              placeholder="请输入"
            >
              <template #prefix>
                <i class="i-tabler:link icon" />
              </template>
            </n-input>
          </div>
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
