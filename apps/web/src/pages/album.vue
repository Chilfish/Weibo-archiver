<script setup lang="ts">
import type { Album } from '@shared'

const album = shallowRef<Album[]>([])
const postStore = usePostStore()
const width = '12rem'
const loadSize = 16

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

onMounted(async () => {
  album.value = await postStore.getAllImgs()
  handleLoad()
})
</script>

<template>
  <main
    id="album"
    class="mx-auto mt-20 rounded-2 p-4 md:w-70rem"
    bg="light dark:dark"
  >
    <n-infinite-scroll
      :distance="5"
      :style="{
        height: 'calc(100vh - 8rem)',
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
          <h2 class="w-full text-start text-2xl font-bold">
            {{ item.date }}
          </h2>
          <div
            class="flex flex-wrap items-center gap-1 px-6"
          >
            <!-- {{ item.imgs }} -->
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
              fit="cover"
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
