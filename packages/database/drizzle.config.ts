import { join } from 'node:path'
import { defineConfig } from 'drizzle-kit'

const root = join(__dirname, '../../apps/desktop')

export default defineConfig({
  schema: './database/schema/*',
  out: './database/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: `${root}/weibo-data.db`,
  },
  verbose: true,
  strict: true,
})
