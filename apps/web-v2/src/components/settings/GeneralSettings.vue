<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { config } from '@/composables'
import { parseAndImport, readFile, usePostStore } from '@weibo-archiver/core'
import { Download, Trash2, Upload } from 'lucide-vue-next'
import { ref } from 'vue'
import ImageSourceOption from './ImageSourceOption.vue'

const postStore = usePostStore()

const imageSourceOptions = [
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
    description: 'https://cdn.ipfsscan.io/weibo',
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
]

async function onImportData(e: Event) {
  const data = await readFile(e)
  await parseAndImport(data)
}

const showResetDialog = ref(false)

function onReset() {
  postStore.clearDB()
}
</script>

<template>
  <div class="space-y-6">
    <section>
      <h3 class="label">
        图片链接设置
      </h3>
      <div class="space-y-2">
        <ImageSourceOption
          v-for="option in imageSourceOptions"
          :id="option.id"
          :key="option.id"
          v-model="config.imgHost"
          v-model:custom-url="config.customImageUrl"
          :value="option.value"
          :label="option.label"
          :description="option.description"
          :show-custom-input="option.showCustomInput"
        />
      </div>
    </section>

    <section>
      <h3 class="label">
        数据管理
      </h3>

      <div class="flex gap-3">
        <Button
          class="relative"
        >
          <input
            type="file"
            accept=".json"
            class="absolute inset-0 opacity-0 w-full h-full"
            placeholder="导入数据"
            @change="onImportData"
          >
          <Upload />导入数据
        </Button>

        <Button>
          <Download />导出数据
        </Button>

        <Dialog>
          <DialogTrigger>
            <Button
              variant="destructive"
            >
              <Trash2 />重置所有数据
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                重置所有数据
              </DialogTitle>
            </DialogHeader>

            <DialogDescription>
              确定要重置所有数据吗？
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
