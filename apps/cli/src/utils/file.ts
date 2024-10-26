import { createReadStream, existsSync } from 'node:fs'
import { rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import readline from 'node:readline'

export async function saveJson(
  savePath: string,
  filename: string,
  data: object,
  intend = 0,
) {
  const path = join(savePath, filename)
  return await writeFile(path, JSON.stringify(data, null, intend), 'utf-8')
}

/**
 * 流式地追加保存 JSON 文件，'\n' 分隔
 */
export async function appendJson(
  savePath: string,
  name: string,
  data: object,
) {
  const path = join(savePath, name)
  return await writeFile(
    path,
    `${JSON.stringify(data, null, 0)}\n`,
    { flag: 'a', encoding: 'utf-8' },
  )
}

/**
 * 重命名文件，时间戳后缀
 */
export async function renameFile(
  savePath: string,
  name: string,
) {
  const path = join(savePath, name)
  if (!existsSync(path))
    return

  const [_name, ext] = name.split('.')

  const date = new Date().getTime()

  return await rename(path, join(savePath, `${_name}-${date}.${ext}`))
}

/**
 * 获取 json 的最后一行
 */
export async function getLastLine(
  savePath: string,
  name: string,
) {
  const path = join(savePath, name)
  if (!existsSync(path))
    return null

  const stream = createReadStream(path)

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Number.POSITIVE_INFINITY,
  })

  let lastLine = ''
  for await (const line of rl)
    lastLine = line

  try {
    return JSON.parse(lastLine)
  }
  catch {
    return null
  }
  finally {
    stream.close()
    rl.close()
  }
}
