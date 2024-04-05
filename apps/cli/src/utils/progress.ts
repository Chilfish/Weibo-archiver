/**
 * 一个简单的进度条
 */
export function updateProgress(
  current: number,
  total: number,
) {
  const width = 50
  const progress = (current / total)
  const completed = Math.round(width * progress)
  const remaining = width - completed

  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)

  const progressBar = `[${'='.repeat(completed)}>${' '.repeat(remaining)}]`
  const percentage = Math.round(progress * 100)

  process.stdout.write(`Progress: ${progressBar} ${percentage}% (${current}/${total})`)

  if (current === total)
    process.stdout.write('\n')
}
