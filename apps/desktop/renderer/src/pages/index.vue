<script lang="ts" setup>
import { fetchIPC } from '#preload'

const router = useRouter()

const user1 = ref<any>()

const cookie = configRef.value.fetchOptions.cookie
if (!cookie)
  router.push('/intro')

const imgUrl = computed(() => {
  const url = user1.value?.avatar
  if (!url)
    return ''

  const { pathname } = new URL(url)
  return `https://cdn.ipfsscan.io/weibo${pathname}`
})
</script>

<template>
  <main class="p-4">
    <pre>
      {{ user1 }}
    </pre>

    <MainImage
      v-if="user1?.avatar"
      :src="imgUrl"
    />

    <div class="flex gap-4">
      <RouterLink
        class="btn"
        to="/intro"
      >
        back to intro
      </RouterLink>

      <button
        class="btn"
        @click="async() => {
          const res = await fetchIPC.userDetail()
          user1 = res
        }"
      >
        fetch userInfo
      </button>
    </div>
  </main>
</template>
