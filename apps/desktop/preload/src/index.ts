import customTitlebar from 'custom-electron-titlebar'
import { contextBridge } from 'electron'
import type { DBMethods } from '@database'
import type { IPCFetch, IPCFile } from '@types'
import { config } from '@core/utils/config'
import { IPCRenderer } from '../../utils'

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new customTitlebar.Titlebar({
    titleHorizontalAlignment: 'left',
  })
})

export * from './nodeCrypto'

export const dbIPC = (() => {
  const IPC = new IPCRenderer<DBMethods>('IPC_DB')

  return {
    send: IPC.send.bind(IPC),
  }
})()

export const fileIPC: IPCFile = (() => {
  const IPC = new IPCRenderer<IPCFile>('files')

  return {
    selectFolder: () => IPC.send('selectFolder'),
    selectFile: (name, ext) => IPC.send('selectFile', name, ext),
    readFile: path => IPC.send('readFile', path),
  }
})()

export const fetchIPC: IPCFetch = (() => {
  const IPC = new IPCRenderer<IPCFetch>('fetch')

  return {
    userInfo: options => IPC.send('userInfo', options),
    userDetail: uid => IPC.send('userDetail', uid),
  }
})()

// unplugin-auto-expose 在 hmr 时总是会导致 undefined 的问题
contextBridge.exposeInMainWorld('config', {
  set: config.set.bind(config),
  get: config.get.bind(config),
  onChange: config.onDidAnyChange.bind(config),
  path: config.path,
  data: config.store,
})
