import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { execSync } from 'node:child_process'

const dist = path.relative(path.resolve(), 'dist')
const pkg = await readFile('package.json', 'utf-8')
  // 移除 dist 前缀
  .then(data => data.replace(/dist\/?/gm, ''))
  // 移除 devDependencies
  .then(data => JSON.parse(data))
  .then((data) => {
    delete data.devDependencies
    return JSON.stringify(data, null, 2)
  })

execSync('pnpm unbuild', { stdio: 'inherit' })

await writeFile(path.join(dist, 'package.json'), pkg)

// 预先下载依赖，并链接到 .bin
execSync('cd dist && npm install && pnpm link .', { stdio: 'inherit' })

const readme = await readFile('README.md', 'utf-8')
await writeFile(path.join(dist, 'README.md'), readme)
