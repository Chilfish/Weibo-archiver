<script setup lang="ts">
import type { AppConfig } from '@/types'
import { useDark, useToggle } from '@vueuse/core'
import { imgCdn } from '@weibo-archiver/core'
import {
  DatabaseBackupIcon,
  DownloadIcon,
  ImageIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
  Trash2Icon,
  UploadIcon,
} from 'lucide-vue-next'
import ImportData from '@/components/common/ImportData.vue'
import { config } from '@/composables'
import { usePostStore, useUserStore } from '@/stores'
import ImageSourceOption from './ImageSourceOption.vue'

interface TImageSourceOption {
  id: string
  value: AppConfig['imgHost']
  label: string
  description: string
  showCustomInput?: boolean
}

const imageSourceOptions: TImageSourceOption[] = [
  {
    id: 'local',
    value: 'local',
    label: '使用本地图片链接',
    description: '需预先下载图片到本地存储（http://localhost:3000/images/）',
  },
  {
    id: 'cdn',
    value: 'cdn',
    label: '使用默认的CDN',
    description: imgCdn,
  },
  {
    id: 'original',
    value: 'original',
    label: '使用微博原图',
    description: '需配合Header Editor插件',
  },
  {
    id: 'custom',
    value: 'custom',
    label: '使用自建图床链接',
    description: '指向图片所在的目录',
    showCustomInput: true,
  },
] as const

const userStore = useUserStore()
const postStore = usePostStore()
async function onReset() {
  const count = await postStore.clearDB()
  console.log(count)
}

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="space-y-6">
    <section>
      <h3 class="font-bold text-xl mb-4">
        <ImageIcon class="inline-block text-5 text-primary" />
        图片链接设置
      </h3>
      <div class="space-y-2">
        <ImageSourceOption
          v-for="option in imageSourceOptions"
          :id="option.id"
          :key="option.id"
          v-model:img-host="config.imgHost"
          v-model:custom-url="config.customImageUrl"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :show-custom-input="option.showCustomInput"
        />
      </div>
    </section>

    <section>
      <h3 class="font-bold text-xl mb-4">
        <PaletteIcon class="inline-block size-5 text-primary" />
        主题
      </h3>

      <Button
        class="w-fit px-2"
        size="icon"
        variant="outline"
        @click="toggleDark()"
      >
        <template v-if="isDark">
          <MoonIcon />  深色模式
        </template>
        <template v-else>
          <SunIcon /> 浅色模式
        </template>
      </Button>
    </section>

    <section>
      <h3 class="font-bold text-xl mb-4">
        <DatabaseBackupIcon class="inline-block text-5 text-primary" />
        数据管理
      </h3>

      <div class="flex gap-3">
        <Button
          class="relative"
        >
          <ImportData />
          <UploadIcon />导入数据
        </Button>

        <Button
          variant="secondary"
          @click="postStore.exportAllData()"
        >
          <DownloadIcon />导出数据
        </Button>

        <Dialog>
          <DialogTrigger>
            <Button
              variant="destructive"
            >
              <Trash2Icon />重置所有数据
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                重置所有数据
              </DialogTitle>
            </DialogHeader>

            <DialogDescription>
              确定要重置 {{ `@${userStore.curUser.name}` }} 的所有数据吗？
            </DialogDescription>

            <DialogFooter>
              <DialogClose>
                <Button
                  variant="ghost"
                >
                  取消
                </Button>
              </DialogClose>

              <DialogClose>
                <Button
                  variant="destructive"
                  @click="onReset"
                >
                  确认
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  </div>
</template>

<style>
h3.label {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

}
</style>
