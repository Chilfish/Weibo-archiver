import { join } from 'node:path'
import { app, ipcMain } from 'electron'
import fs from 'fs-extra'
import { UserDB, createDatabase } from '@core/database'

const dataPath = app.getPath('userData')
const resources = process.resourcesPath
const dbFile = 'weibo-data.db'

const dbPath = join(dataPath, dbFile)

// 如果应用文件夹中没有数据库文件，则从资源文件夹中复制
fs.existsSync(dbPath) || fs.copySync(join(resources, dbFile), dbPath)

const db = createDatabase(dbPath)

const channels = {
  IPC_USER: new UserDB(db),
} as const

export function setupDatabaseIPC() {
  function handleDatabaseIPC(channel: string, database: any) {
    ipcMain.handle(channel, async (
      _event,
      { name, payload }: any,
    ) => {
      const data = await database[name](...payload)
      // mainLog.info('IPC', channel, name, data)
      return data
    })
  }

  for (const [channel, database] of Object.entries(channels))
    handleDatabaseIPC(channel, database)
}
