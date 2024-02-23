import customTitlebar from 'custom-electron-titlebar'
import type { UserDBMethods } from '@database'
import type { AppConfig, IPCFetch, IPCFile } from '@types'
import { config } from '@core/utils/config'
import { IPCRenderer } from '../../utils'

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new customTitlebar.Titlebar({
    iconSize: 32,
    titleHorizontalAlignment: 'left',
  })
})

export * from './nodeCrypto'

export const UserIPC = (() => {
  const IPC = new IPCRenderer<UserDBMethods>('IPC_USER')

  return {
    send: IPC.send.bind(IPC),
  }
})()

export const FileIPC: IPCFile = (() => {
  const IPC = new IPCRenderer<IPCFile>('files')

  return {
    selectFolder: () => IPC.send('selectFolder'),
    selectFile: (name, ext) => IPC.send('selectFile', name, ext),
    readFile: path => IPC.send('readFile', path),
  }
})()

export const FetchIPC: IPCFetch = (() => {
  const IPC = new IPCRenderer<IPCFetch>('fetch')

  return {
    userInfo: (id, name) => IPC.send('userInfo', id, name),
  }
})()

type OnChange = (callback: (newValue: AppConfig, oldValue: AppConfig) => void) => Function
export const _config = {
  set: config.set.bind(config),
  get: config.get.bind(config),
  onChange: config.onDidAnyChange.bind(config) as OnChange,
  path: config.path,
  data: config.store,
}
