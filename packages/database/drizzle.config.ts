import { join } from 'node:path'
import { defineConfig } from 'drizzle-kit'

const root = join(__dirname, '../../apps/desktop')

export default defineConfig({
  schema: './src/schema/*',
  out: './src/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: `${root}/weibo-data.db`,
  },
  verbose: true,
  strict: true,
})
