import { copyFile, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { execSync } from 'node:child_process'

const dist = path.relative(path.resolve(), 'dist')
const root = path.resolve(path.resolve(), '../../')

const pkg = await readFile('package.json', 'utf-8')
  // 移除 dist 前缀
  .then(data => data.replace(/dist\//gm, ''))
  // 移除 devDependencies
  .then(data => JSON.parse(data))
  .then((data) => {
    delete data.devDependencies
    return JSON.stringify(data, null, 2)
  })

execSync('pnpm unbuild', { stdio: 'inherit' })

await writeFile(path.join(dist, 'package.json'), pkg)

// 预先下载依赖
execSync('cd dist && npm install', { stdio: 'inherit' })

const readme = await readFile('README.md', 'utf-8')
await writeFile(path.join(dist, 'README.md'), readme)

await rm(path.join(dist, 'package-lock.json'))

// 复制 scripts 的下载图片脚本
const scripts = path.join(root, 'scripts')
const files = await readdir(scripts)
for (const file of files) {
  if (file.endsWith('.mjs'))
    await copyFile(path.join(scripts, file), path.join(dist, file))
}
