<script setup lang="ts">
import type { FetchConfig } from '@weibo-archiver/core'
import { DEFAULT_FETCH_CONFIG } from '@weibo-archiver/core'
import { SearchIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import DatePicker from '@/components/DatePicker.vue'

const openDialog = defineModel<boolean>('open', {
  default: false,
})

const config = ref<FetchConfig>({ ...DEFAULT_FETCH_CONFIG })

watch(config, c => console.log(c), { deep: 10 })

const searchText = ref('')
async function onSearchUser(e: SubmitEvent) {
  e.preventDefault()
  console.log(searchText.value)
}

interface Option {
  label: string
  value: keyof FetchConfig
  remark?: string
}

const options: Option[] = [
  {
    label: '导出全部微博',
    value: 'isFetchAll',
    remark: '导出全部微博，不限制时间范围',
  },
  {
    label: '包含转发的微博',
    value: 'hasRepost',
    remark: '导出微博时包含转发微博',
  },
  {
    label: '包含转发的图片',
    value: 'repostPic',
    remark: '包含转发微博中的图片',
  },
  {
    label: '包含评论',
    value: 'hasComment',
    remark: '导出微博时包含部分一级评论',
  },
  {
    label: '继续上次的记录',
    value: 'restore',
    remark: '从上次终止的地方继续，不清除本地缓存',
  },
  {
    label: '导出收藏',
    value: 'hasFavorites',
    remark: '导出自己收藏的微博，对其他人无效',
  },
  {
    label: '导出微博',
    value: 'hasWeibo',
    remark: '',
  },
  {
    label: '导出关注列表',
    value: 'hasFollowings',
    remark: '',
  },
] as const
</script>

<template>
  <Dialog
    v-model:open="openDialog"
  >
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>
          爬取微博配置
        </DialogTitle>

        <DialogDescription>
          获取到的微博将保存在浏览器本地中
        </DialogDescription>
      </DialogHeader>

      <main
        class="flex flex-col justify-center"
      >
        <form
          class="w-full mb-4"
          @submit="onSearchUser"
        >
          <Label
            for="username"
            class="text-base font-medium mb-2"
          >
            搜索用户
          </Label>
          <div class="relative">
            <Input
              id="username"
              v-model="searchText"
              placeholder="输入微博用户名"
              class="pr-8"
            />
            <Button
              type="submit"
              variant="ghost"
              class="absolute top-0 right-0"
            >
              <SearchIcon class="h-4 w-4" />
            </Button>
          </div>
        </form>

        <div
          class="font-medium mb-2"
        >
          导出选项
        </div>
        <section
          class=" p-3 rounded-xl overflow-auto"
        >
          <div
            v-for="option in options"
            :key="option.value"
            class="flex pb-4"
          >
            <Label
              :for="option.value"
              class="flex flex-col items-start cursor-pointer"
            >
              <div>
                {{ option.label }}
              </div>
              <div
                v-if="option.remark"
                class="text-xs text-muted-foreground"
              >
                {{ option.remark }}
              </div>
            </Label>

            <Switch
              :id="option.value"
              v-model="config[option.value]"
              class="ml-auto"
            />
          </div>

          <Label
            for="comment-count"
            class="my-2"
          >
            评论获取数量
          </Label>

          <Select
            id="comment-count"
            v-model="config.commentCount"
            :disabled="!config.hasComment"
          >
            <SelectTrigger
              class="w-full"
            >
              <SelectValue placeholder="5 条" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="i in 4"
                  :key="i"
                  :value="i * 5"
                >
                  {{ i * 5 }} 条
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label
            class="my-2"
          >
            导出时间范围
          </Label>

          <div class="flex items-center gap-2">
            <DatePicker
              :disabled="config.isFetchAll"
            />
            <span>~</span>
            <DatePicker
              :disabled="config.isFetchAll"
            />
          </div>
        </section>
      </main>
    </DialogScrollContent>
  </Dialog>
</template>

<style scoped>

</style>
