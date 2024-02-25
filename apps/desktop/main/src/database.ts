import { join } from 'node:path'
import { app, ipcMain } from 'electron'
import fs from 'fs-extra'
import { type DBMethods, DBQuery, createDatabase } from '@database'

// import { mainLog } from '../../utils'

const dataPath = app.getPath('userData')
const resources = process.resourcesPath
const dbFile = 'weibo-data.db'

const dbPath = join(dataPath, dbFile)

// 如果应用文件夹中没有数据库文件，则从资源文件夹中复制
if (!fs.existsSync(dbPath)) {
  if (import.meta.env.DEV)
    fs.copySync(join(app.getAppPath(), dbFile), dbPath)
  else
    fs.copySync(join(resources, dbFile), dbPath)
}

const db = createDatabase(dbPath)
const dbQuery = new DBQuery(db)

export function setupDatabaseIPC() {
  ipcMain.handle('IPC_DB', async (
    _event,
    { name, payload }: { name: keyof DBMethods, payload: any[] },
  ) => {
    // @ts-expect-error payload is any[]
    const data = await dbQuery[name](...payload)
    // mainLog.info('IPC', name, ...payload, data)
    return data
  })
}
