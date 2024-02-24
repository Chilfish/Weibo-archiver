<script setup lang="ts">
const cookie = ref('')
const isError = ref(false)
const router = useRouter()

watchEffect(() => {
  if (cookie.value && !cookie.value.startsWith('XSRF-TOKEN='))
    isError.value = true
  else
    isError.value = false
})

function setCookie() {
  console.log(cookie.value)
  if (isError.value)
    return

  config.set('fetchOptions.cookie', cookie.value)
  router.push('/')
}
</script>

<template>
  <main class="h-full flex">
    <div class="w-3/5 flex flex-col justify-center p-4">
      <header class="center justify-start">
        <img
          src="/icon.png"
          class="mr-4 h-16 w-16 rounded-xl"
        >
        <h2
          class="text-2xl font-bold"
        >
          Weibo Archiver - 微博备份
        </h2>
      </header>

      <MainImage
        :width="500"
        :lazy="false"
        src="/get-cookie.webp"
        class="m-auto"
      />
    </div>

    <div class="w-2/5 flex flex-col justify-center gap-4 p-4">
      <p>
        首次使用需要获取微博的 Cookie，浏览器打开登录的微博网页，然后按下 F12 后，按左图的步骤进行操作。
      </p>

      <n-input
        v-model:value="cookie"
        round
        type="textarea"
        placeholder="Cookie 值"
      />

      <p
        v-show="isError"
        text="red-500 3"
      >
        *请填写如图所示格式的 Cookie
      </p>

      <button
        class="btn"
        :disabled="!cookie"
        @click="setCookie"
      >
        进入首页
      </button>
    </div>
  </main>
</template>
