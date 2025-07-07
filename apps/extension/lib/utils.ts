import type { ClassValue } from 'clsx'
import type {
  BackgroundContentRouter,
  BackgroundWindowRouter,
  PopupBackgroundRouter,
  PopupContentRouter,
} from '@/lib/message'
import { createTipcClient } from '@weibo-archiver/core'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { sendMessage as background_sendMessage } from 'webext-bridge/background'
import { sendMessage as popup_sendMessage } from 'webext-bridge/popup'
import { browser } from 'wxt/browser'

export const popupBackgroundClient = createTipcClient<PopupBackgroundRouter>({
  async sender(key, message) {
    return popup_sendMessage(key, message, 'background')
  },
})

export const popupContentClient = createTipcClient<PopupContentRouter>({
  async sender(key, message) {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    })
    const dest = `content-script@${tabs[0].id}`
    return popup_sendMessage(key, message, dest)
  },
})

export const backgroundContentClient = createTipcClient<BackgroundContentRouter>({
  async sender(key, message) {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    })
    // @see https://serversideup.net/open-source/webext-bridge/docs/guide/examples#popup-content-script
    const dest = `content-script@${tabs[0].id}`
    return background_sendMessage(key, message, dest)
  },
})

export const backgroundWindowClient = createTipcClient<BackgroundWindowRouter>({
  async sender(key, message) {
    return background_sendMessage(key, message, 'window')
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 工具函数：解析微博用户 URL
export function parseWeiboUrl(
  url: string,
): { uid: string, username?: string } | null {
  try {
    const urlObj = new URL(url)

    // 支持的 URL 格式：
    // https://weibo.com/u/1234567890
    // https://weibo.com/username
    // https://m.weibo.cn/u/1234567890
    // https://m.weibo.cn/profile/1234567890

    const pathSegments = urlObj.pathname.split('/').filter(Boolean)

    if (pathSegments.length === 0) {
      return null
    }

    // 处理 /u/uid 格式
    if (pathSegments[0] === 'u' && pathSegments[1]) {
      const uid = pathSegments[1]
      if (/^\d+$/.test(uid)) {
        return { uid }
      }
    }

    // 处理 /profile/uid 格式 (移动端)
    if (pathSegments[0] === 'profile' && pathSegments[1]) {
      const uid = pathSegments[1]
      if (/^\d+$/.test(uid)) {
        return { uid }
      }
    }

    // 处理直接用户名格式 /username
    if (
      pathSegments[0]
      && pathSegments[0] !== 'u'
      && pathSegments[0] !== 'profile'
    ) {
      return { uid: '', username: pathSegments[0] }
    }

    return null
  }
  catch (error) {
    console.error('Failed to parse Weibo URL:', error)
    return null
  }
}

// 格式化时间间隔
export function formatInterval(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} 分钟`
  }
  if (minutes < 1440) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0
      ? `${hours} 小时 ${remainingMinutes} 分钟`
      : `${hours} 小时`
  }
  const days = Math.floor(minutes / 1440)
  const remainingHours = Math.floor((minutes % 1440) / 60)
  return remainingHours > 0
    ? `${days} 天 ${remainingHours} 小时`
    : `${days} 天`
}

// 生成任务 ID（使用用户UID）
export function generateTaskId(uid: string): string {
  return uid
}
