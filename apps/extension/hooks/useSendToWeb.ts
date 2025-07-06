import { useState } from 'react'
import { popupContentClient } from '@/lib/utils'

export function useSendToWeb() {
  const [isSending, setIsSending] = useState(false)
  const [lastSendTime, setLastSendTime] = useState<number | null>(null)

  const sendToWeb = async () => {
    try {
      setIsSending(true)

      const response = await popupContentClient.sendDataToWeb()

      if (response.success) {
        setLastSendTime(Date.now())

        // 3秒后清除成功状态
        setTimeout(() => {
          setLastSendTime(null)
        }, 3000)
      }
      else {
        throw new Error(response.error || '发送失败')
      }
    }
    catch (error) {
      const errorMessage = (error as Error).message
      console.error('发送数据到web端失败:', errorMessage)

      // 开发模式下显示详细错误信息
      if (process.env.NODE_ENV === 'development') {
        console.error('详细错误信息:', error)
      }

      throw error
    }
    finally {
      setIsSending(false)
    }
  }

  const clearError = () => {}

  return {
    sendToWeb,
    isSending,
    lastSendTime,
    clearError,
  }
}
