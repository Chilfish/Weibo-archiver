import { join, resolve } from 'node:path'
import { execSync } from 'node:child_process'
import consola from 'consola'
import fs from 'fs-extra'

const root = resolve()

function build() {
  consola.info('Rebuild the better-sqlite3')
  execSync('cd ../../packages/core && pnpm rebuild better-sqlite3', { stdio: 'inherit' })

  consola.info('Building the app')
  execSync('pnpm nuxi build', { stdio: 'inherit' })

  consola.info('Copying the database')
  const dbPath = join(root, '../desktop/weibo-data.db')
  const output = join(root, '.output/server/weibo-data.db')
  fs.copyFileSync(dbPath, output)

  consola.success('Build complete')
}

build()
