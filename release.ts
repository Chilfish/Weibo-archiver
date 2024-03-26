import path from 'node:path'
import fs from 'node:fs'
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

const root = path.resolve()
const scripts = path.join(root, 'scripts')
const webDist = path.join(root, 'apps/web/.output')

const appName = 'weibo-archiver'

// 打包
await compressFolder(webDist, path.join(root, `dist/${appName}-webapp.zip`))
await compressFolder(scripts, path.join(root, `dist/${appName}-scripts.zip`))

console.log('打包完成')

// copy file
const monkey = path.join(root, `dist/monkey/${appName}.user.js`)
fs.copyFileSync(monkey, path.join(root, `dist/${appName}.user.js`))
