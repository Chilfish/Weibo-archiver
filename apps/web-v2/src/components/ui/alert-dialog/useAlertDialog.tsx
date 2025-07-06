import type { VNode } from 'vue'
import { defineComponent, onUnmounted, ref, Teleport } from 'vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './'

/** 用户调用时传入的选项 */
export interface AlertDialogOptions {
  title: string
  description: string | VNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

/** 内部使用的完整选项 */
interface AlertDialogInternalOptions extends AlertDialogOptions {
  id: symbol
  resolve: (value: boolean) => void
  reject: (reason?: any) => void
}

/** 暴露给外部的 API */
export interface AlertDialogApi {
  show: (options: AlertDialogOptions) => Promise<boolean>
}

/**
 * 全局单例，持有 show 方法的引用。
 * 这样，我们就可以在任何地方（组件内外）调用它。
 */
const alertDialogSingleton: AlertDialogApi = {
  show: (options) => {
    console.error('AlertDialog options received:', options)
    return Promise.reject(new Error('AlertDialogProvider 尚未挂载。请确保在 App.vue 或 main.ts 中正确使用了 AlertDialogProvider。'))
  },
}

export const AlertDialogProvider = defineComponent({
  name: 'AlertDialogProvider',
  setup(_, { slots }) {
    const dialogs = ref<AlertDialogInternalOptions[]>([])

    const show = (options: AlertDialogOptions): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        const id = Symbol('alert-dialog-instance')
        dialogs.value.push({ ...options, id, resolve, reject })
      })
    }

    const removeDialog = (id: symbol) => {
      const index = dialogs.value.findIndex(d => d.id === id)
      if (index > -1) {
        dialogs.value.splice(index, 1)
      }
    }

    const handleConfirm = async (dialog: AlertDialogInternalOptions) => {
      try {
        await dialog.onConfirm?.()
        dialog.resolve(true)
      }
      catch (e) {
        dialog.reject(e)
      }
      finally {
        removeDialog(dialog.id)
      }
    }

    const handleCancel = async (dialog: AlertDialogInternalOptions) => {
      try {
        await dialog.onCancel?.()
        dialog.resolve(false)
      }
      catch (e) {
        dialog.reject(e)
      }
      finally {
        removeDialog(dialog.id)
      }
    }

    alertDialogSingleton.show = show

    onUnmounted(() => {
      alertDialogSingleton.show = () => {
        console.error('AlertDialogProvider has been unmounted.')
        return Promise.reject(new Error('AlertDialogProvider 已被卸载。'))
      }
    })

    return () => (
      <>
        {/* 渲染主应用内容 */}
        {slots.default ? slots.default() : null}

        {/* 传送门，将对话框渲染到 body */}
        <Teleport to="body">
          {dialogs.value.map(dialog => (
            <AlertDialog
              key={dialog.id}
              open={true}
              onUpdate:open={(isOpen: boolean) => {
                if (!isOpen) {
                  handleCancel(dialog)
                }
              }}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
                  <AlertDialogDescription>{dialog.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => handleCancel(dialog)}>
                    {dialog.cancelText || '取消'}
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleConfirm(dialog)}>
                    {dialog.confirmText || '确认'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
        </Teleport>
      </>
    )
  },
})

export function useAlertDialog(): AlertDialogApi {
  return alertDialogSingleton
}
