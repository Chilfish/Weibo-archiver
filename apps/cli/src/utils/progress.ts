import process from 'node:process'
import readline from 'node:readline'

process.addListener('SIGINT', () => {
  // 清除进度条
  readline.cursorTo(process.stdout, 0)
  readline.clearLine(process.stdout, 0)

  // 恢复光标并退出
  process.stdout.write('\n')
  process.stdout.write('👋')
  process.exit(0)
})

export interface ProgressOptions {
  current: number
  total: number
  offset?: number
  speed?: string
  eta?: string
  done?: boolean
  /**
   * 格式化进度信息的函数
   */
  formatter?: (num: number) => string
}

/**
 * 一个美观的进度条实现，始终显示在终端底部
 */
export function updateProgress(
  options: ProgressOptions,
) {
  const {
    current,
    total,
    speed,
    eta,
    done,
    offset = 0,
    formatter = num => num.toString(),
  } = options

  const width = 30
  const progress = Math.min(1, current / total)
  const completed = Math.round(width * progress)
  const remaining = width - completed

  const fullBlock = '█'
  const emptyBlock = '░'

  // 保存光标位置
  process.stdout.write('\x1B7')

  // 移动到终端底部
  process.stdout.write('\x1B[0J') // 清除从光标到屏幕底部的内容
  process.stdout.write('\x1B[999B') // 移动到尽可能底部的位置
  readline.cursorTo(process.stdout, 0)
  readline.moveCursor(process.stdout, 0, offset)

  const progressBar = `${fullBlock.repeat(completed)}${emptyBlock.repeat(remaining)}`
  const percentage = Math.round(progress * 100)

  const status = current >= total ? '\x1B[32m✓\x1B[0m' : '\x1B[36m⋯\x1B[0m'
  const currentText = formatter(current)
  const totalText = formatter(total)
  const speedText = speed ? ` ${speed}` : ''
  const etaText = eta ? ` ${eta}` : ''

  const progressText = `${progressBar} ${percentage}% ${status} [${currentText}/${totalText}]${speedText}${etaText}`

  process.stdout.write(`\r${progressText}`)

  // 恢复光标位置
  process.stdout.write('\x1B8')

  if (current === total && done) {
    process.stdout.write('\n') // 完成后换行
    process.stdout.write('\n') // 额外添加一个换行，为下一个内容留出空间
  }
}
