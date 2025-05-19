import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import JSZip from 'jszip'

// 打包文件夹
async function compressFolder(folderPath: string, outputPath: string) {
  const zip = new JSZip()

  const addFileToZip = async (filePath: string, relativePath: string) => {
    const data = fs.readFileSync(filePath)
    zip.file(relativePath, data)
  }

  const addFolderToZip = async (folderPath: string, relativePath: string) => {
    const files = fs.readdirSync(folderPath)
    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const stats = fs.statSync(filePath)
      if (stats.isDirectory())
        await addFolderToZip(filePath, path.join(relativePath, file))
      else
        await addFileToZip(filePath, path.join(relativePath, file))
    }
  }

  await addFolderToZip(folderPath, '')

  const content = await zip.generateAsync({ type: 'nodebuffer' })
  fs.writeFileSync(outputPath, content)
}

const appName = 'weibo-archiver'

const root = path.resolve()
const webDist = path.join(root, 'apps/web-v2/dist')
const monkeyDist = path.join(root, `apps/monkey/dist/${appName}.user.js`)
const cliDist = path.join(root, `apps/cli/dist/${appName}.mjs`)

fs.mkdirSync(path.join(root, 'dist'), { recursive: true })

// 构建
execSync('pnpm build:web', { stdio: 'inherit' })
await compressFolder(webDist, path.join(root, `dist/${appName}-web.zip`))

execSync('pnpm build:monkey', { stdio: 'inherit' })
fs.copyFileSync(monkeyDist, path.join(root, `dist/${appName}-user.js`))

execSync('pnpm build:cli', { stdio: 'inherit' })
fs.copyFileSync(cliDist, path.join(root, `dist/${appName}.mjs`))
