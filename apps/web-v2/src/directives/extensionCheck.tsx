import type { App, DirectiveBinding } from 'vue'
import { promiseTimeout } from '@vueuse/core'
import { createApp, ref } from 'vue'
import { sendMessage } from 'webext-bridge/window'
import {
  Dialog,
} from '@/components/ui/dialog'

interface ExtensionCheckOptions {
  onConnected?: () => void
  onDisconnected?: () => void
  showDialog?: boolean
  timeout?: number
  autoCheck?: boolean
}

// 全局状态
const isConnectedToExtension = ref(false)
const showExtensionDialog = ref(false)
let dialogApp: App | null = null

// 检测插件连接状态
async function checkExtensionConnection(timeout = 500): Promise<boolean> {
  try {
    const result = await Promise.race([
      promiseTimeout(timeout),
      sendMessage<boolean>('ping', true).catch(() => false),
    ])

    const isConnected = !!result
    isConnectedToExtension.value = isConnected
    console.log('Extension connection check:', isConnected)

    return isConnected
  }
  catch (error) {
    console.error('Extension connection check failed:', error)
    isConnectedToExtension.value = false
    return false
  }
}

// 创建对话框
function createExtensionDialog() {
  if (dialogApp) {
    dialogApp.unmount()
  }

  const dialogContainer = document.createElement('div')
  document.body.appendChild(dialogContainer)

  const handleDialogOk = () => {
    showExtensionDialog.value = false
    // 可以在这里添加跳转到插件安装页面的逻辑
    window.open('https://github.com/chilfish/weibo-archiver', '_blank')
  }

  const handleDialogSkip = () => {
    showExtensionDialog.value = false
  }

  const handleDialogClose = (open: boolean) => {
    showExtensionDialog.value = open
    if (!open && dialogApp) {
      setTimeout(() => {
        dialogApp?.unmount()
        dialogContainer.remove()
        dialogApp = null
      }, 200)
    }
  }

  dialogApp = createApp({
    setup() {
      return () => (
        <Dialog
          open={showExtensionDialog.value}
          onUpdate:open={val => (showExtensionDialog.value = val)}
        >
          <div>
            <p>请安装插件以获得更好的体验</p>
            <button onClick={handleDialogOk}>安装</button>
            <button onClick={handleDialogSkip}>跳过</button>
          </div>
        </Dialog>
      )
    },
  })

  dialogApp.mount(dialogContainer)
}

// 自定义指令
export const vExtensionCheck = {
  mounted(el: HTMLElement, binding: DirectiveBinding<ExtensionCheckOptions>) {
    const options: ExtensionCheckOptions = {
      showDialog: true,
      timeout: 500,
      autoCheck: false,
      ...binding.value,
    }

    // 自动检查模式
    if (options.autoCheck) {
      checkExtensionConnection(options.timeout).then((isConnected) => {
        if (isConnected) {
          options.onConnected?.()
        }
        else {
          options.onDisconnected?.()
          if (options.showDialog) {
            showExtensionDialog.value = true
            createExtensionDialog()
          }
        }
      })
    }

    // 点击检查模式
    const handleClick = async (event: Event) => {
      // 如果是自动检查模式，不处理点击事件
      if (options.autoCheck)
        return

      event.preventDefault()

      const isConnected = await checkExtensionConnection(options.timeout)

      if (isConnected) {
        options.onConnected?.()
      }
      else {
        options.onDisconnected?.()
        if (options.showDialog) {
          showExtensionDialog.value = true
          createExtensionDialog()
        }
      }
    }

    // 只有非自动检查模式才添加点击事件
    if (!options.autoCheck) {
      el.addEventListener('click', handleClick)
      el._extensionCheckHandler = handleClick
    }
  },

  beforeUnmount(el: HTMLElement) {
    if (el._extensionCheckHandler) {
      el.removeEventListener('click', el._extensionCheckHandler)
      delete el._extensionCheckHandler
    }
  },
}

// 导出工具函数
export { checkExtensionConnection, isConnectedToExtension }

// 类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    vExtensionCheck: typeof vExtensionCheck
  }
}

declare global {
  interface HTMLElement {
    _extensionCheckHandler?: (event: Event) => void
  }
}
