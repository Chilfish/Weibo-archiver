<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

document.querySelector('#app').innerHTML = ''
</script>

<template>
  <el-config-provider :locale="zhCn">
    <Suspense>
      <Ctrl
        v-show="useConfigStore().showCtrl"
        class="font-sans"
      />
    </Suspense>
    <Preview />
  </el-config-provider>
</template>
