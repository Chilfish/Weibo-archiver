import { execSync } from 'node:child_process'
import { copyFile, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dist = path.relative(path.resolve(), 'dist')
const root = path.resolve(path.resolve(), '../../')

const pkg = await readFile('package.json', 'utf-8')
  // 移除 dist 前缀
  .then(data => data.replace(/dist\//g, ''))
  // 移除 devDependencies
  .then(data => JSON.parse(data))
  .then((data) => {
    delete data.devDependencies
    return JSON.stringify(data, null, 2)
  })

execSync('pnpm unbuild', { stdio: 'inherit' })

await writeFile(path.join(dist, 'package.json'), pkg)

const copyFiles = [
  'README.md',
  'LICENSE',
]

for (const file of copyFiles) {
  await copyFile(path.join(root, file), path.join(dist, file))
}
