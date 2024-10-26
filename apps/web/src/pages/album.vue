<script setup lang="ts">
import type { Album } from '@shared'
import { KeyUser } from '@core/constants/vueProvide'

import { PostItem } from '@ui'
import { useWindowSize } from '@vueuse/core'
import { useMessage, useModal } from 'naive-ui'

const album = shallowRef<Album[]>([])
const postStore = usePostStore()

const { width: windowWidth } = useWindowSize()

const isMobile = computed(() => windowWidth.value < 768)
const width = computed(() => isMobile.value ? '7rem' : '12rem')
const loadSize = 32

const loadedAlbum = ref<AlbumGroup[]>([]) // 用于存储已加载的相册

interface AlbumGroup {
  imgs: {
    id: string
    url: string
  }[]
  date: string
}

function groupByDate(album: Album[]): AlbumGroup[] {
  const groups: AlbumGroup[] = []
  let currentGroup: AlbumGroup | null = null
  for (const item of album) {
    if (!currentGroup || currentGroup.date !== item.date) {
      currentGroup = {
        date: item.date,
        imgs: [],
      }
      groups.push(currentGroup)
    }
    currentGroup.imgs.push(item)
  }
  return groups
}

function handleLoad() {
  const loadedLength = loadedAlbum.value.map(({ imgs }) => imgs.length).reduce((a, b) => a + b, 0)
  const loaded = album.value.splice(loadedLength, loadSize)

  const groups = groupByDate(loaded)
  groups.forEach(({ date, imgs }) => {
    const loadedItem = loadedAlbum.value.find(item => item.date === date)

    if (loadedItem) {
      loadedItem.imgs.push(...imgs)
    }
    else {
      loadedAlbum.value.push({
        date,
        imgs,
      })
    }
  })
}

const modal = useModal()
const message = useMessage()
async function openDetail(id: string) {
  const post = await postStore.getById(id)
  if (!post)
    return message.warning('微博不存在本地')

  modal.create({
    title: '微博详情',
    preset: 'card',
    style: {
      width: '50rem',
    },
    content: () =>
      h(
        PostItem,
        {
          post,
        },
      ),
  })
}

const publicStore = usePublicStore()
const loaded = ref(false)
onMounted(async () => {
  publicStore.load()

  album.value = await postStore.getAllImgs()

  handleLoad()
  const { curUser } = publicStore
  provide(KeyUser, curUser as unknown as User)

  loaded.value = true
  if (album.value.length === 0) {
    message.warning('没有找到任何图片')
  }
})
</script>

<template>
  <main
    id="album"
    class="mx-auto mt-4 rounded-2 p-4 md:w-70rem"
    bg="light dark:dark"
  >
    <n-spin
      v-if="!loaded"
      class="center pt-16"
      size="large"
    />
    <n-empty
      v-else-if="album.length === 0"
      description="没有找到任何图片"
    >
      <template #extra>
        <router-link
          to="/post"
          class="btn hover:text-white"
        >
          返回首页
        </router-link>
      </template>
    </n-empty>

    <n-infinite-scroll
      v-else
      :distance="5"
      :style="{
        height: 'calc(100vh - 6rem)',
      }"
      @load="handleLoad"
    >
      <n-image-group>
        <section
          v-for="item in loadedAlbum"
          :id="item.date"
          :key="item.date"
          class="mb-4 flex flex-col gap-2"
        >
          <h2 class="w-full text-start text-5 font-bold">
            {{ item.date }}
          </h2>
          <div
            class="flex flex-wrap items-center gap-1 px-6"
          >
            <MainImage
              v-for="{ id, url } in item.imgs"
              :id="`img-${id}`"
              :key="`img-${id}`"
              :src="url"
              :style="{
                width,
                height: width,
              }"
              :min-height="width"
              :preview="false"
              fit="cover"
              @click="() => openDetail(id)"
            />
          </div>
        </section>
      </n-image-group>
    </n-infinite-scroll>
  </main>
</template>

<style>
#album .n-scrollbar > .n-scrollbar-container {
  overflow-x: hidden !important;
}

#album .n-scrollbar-rail{
  display: none !important;
}
</style>
