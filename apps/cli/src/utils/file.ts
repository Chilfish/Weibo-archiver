import { createReadStream, existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import readline from 'node:readline'

export async function saveJson(args: {
  savePath: string
  filename: (() => string) | string
  data: unknown
  intend: number
}) {
  if (!existsSync(args.savePath)) {
    await mkdir(args.savePath, { recursive: true })
  }

  const filename = typeof args.filename === 'function'
    ? args.filename()
    : args.filename

  const filePath = path.join(args.savePath, filename)
  return await writeFile(filePath, JSON.stringify(args.data, null, args.intend || 2), 'utf-8')
}

export async function readJson<T = any>(file: string) {
  const filePath = path.resolve(file)

  const data = await readFile(filePath, 'utf-8')
  try {
    return JSON.parse(data) as T
  }
  catch (e) {
    console.error(`Error parsing JSON from ${file}:`, e)
    return data as T
  }
}

/**
 * 流式地追加保存 JSON 文件，'\n' 分隔
 */
export async function appendJson(args: {
  savePath: string
  name: string
  data: object
}) {
  const filePath = path.join(args.savePath, args.name)
  return await writeFile(
    filePath,
    `${JSON.stringify(args.data, null, 0)}\n`,
    { flag: 'a', encoding: 'utf-8' },
  )
}

/**
 * 获取 json 的最后一行
 */
export async function getLastLine(
  savePath: string,
  name: string,
) {
  const filePath = path.join(savePath, name)
  if (!existsSync(filePath))
    return null

  const stream = createReadStream(filePath)

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
