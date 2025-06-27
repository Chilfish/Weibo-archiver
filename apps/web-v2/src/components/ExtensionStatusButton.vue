<script setup lang="ts">
import { CheckCircle, Loader2, XCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { isConnectedToExtension } from '@/directives'

interface Props {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  showStatus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'default',
  showStatus: true,
})

const isChecking = ref(false)

const handleExtensionConnected = () => {
  isChecking.value = false
  console.log('插件连接成功')
}

const handleExtensionDisconnected = () => {
  isChecking.value = false
  console.log('插件未连接')
}

const handleClick = () => {
  isChecking.value = true
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      v-extension-check="{
        autoCheck: false,
        showDialog: true,
        onConnected: handleExtensionConnected,
        onDisconnected: handleExtensionDisconnected,
      }"
      :variant="props.variant"
      :size="props.size"
      :disabled="isChecking"
      class="relative"
      @click="handleClick"
    >
      <Loader2 v-if="isChecking" class="mr-2 h-4 w-4 animate-spin" />
      <template v-else>
        检查插件状态
      </template>
    </Button>

    <Badge
      v-if="props.showStatus && !isChecking"
      :variant="isConnectedToExtension ? 'default' : 'destructive'"
      class="flex items-center gap-1"
    >
      <CheckCircle v-if="isConnectedToExtension" class="h-3 w-3" />
      <XCircle v-else class="h-3 w-3" />
      {{ isConnectedToExtension ? '已连接' : '未连接' }}
    </Badge>
  </div>
</template>
