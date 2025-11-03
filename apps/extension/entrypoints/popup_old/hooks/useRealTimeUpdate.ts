import { useEffect, useState } from 'react'

/**
 * 实时更新Hook，用于显示倒计时和实时时间
 */
export function useRealTimeUpdate(intervalMs = 1000) {
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs])

  return currentTime
}

/**
 * 格式化时间差，显示倒计时
 */
export function formatTimeRemaining(
  targetTime: number,
  currentTime: number,
): string {
  if (!targetTime || targetTime === 0)
    return '未设置'

  const diff = targetTime - currentTime

  if (diff <= 0)
    return '准备运行'

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}天${hours % 24}小时${minutes % 60}分钟`
  }
  if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟${seconds % 60}秒`
  }
  if (minutes > 0) {
    return `${minutes}分钟${seconds % 60}秒`
  }
  return `${seconds}秒`
}

/**
 * 获取时间状态颜色
 */
export function getTimeStatusColor(
  targetTime: number,
  currentTime: number,
): string {
  if (!targetTime || targetTime === 0)
    return 'text-muted-foreground'

  const diff = targetTime - currentTime

  if (diff <= 0)
    return 'text-green-600 dark:text-green-400'
  if (diff <= 60000)
    return 'text-orange-600 dark:text-orange-400' // 1分钟内
  if (diff <= 300000)
    return 'text-yellow-600 dark:text-yellow-400' // 5分钟内

  return 'text-blue-600 dark:text-blue-400'
}
