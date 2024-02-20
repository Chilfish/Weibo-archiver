import customTitlebar from 'custom-electron-titlebar'
import type { UserDBMethods } from '@core/database'
import type { AppConfig } from '@types'
import { IPCRenderer, registerFileRendererIPC } from '../../utils'
import { config as _config } from './config'

window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new customTitlebar.Titlebar({})
})

export * from './nodeCrypto'

const _UserIPC = new IPCRenderer<UserDBMethods>('IPC_USER')
export const UserIPC = {
  send: _UserIPC.send.bind(_UserIPC),
}

const _FileIPC = registerFileRendererIPC()
export const FileIPC = {
  selectFolder: _FileIPC.selectFolder,
  selectFile: _FileIPC.selectFile,
  readFile: _FileIPC.readFile,
}

type OnChange = (callback: (newValue: AppConfig, oldValue: AppConfig) => void) => Function
export const config = {
  set: _config.set.bind(_config),
  get: _config.get.bind(_config),
  onChange: _config.onDidAnyChange.bind(_config) as OnChange,
  path: _config.path,
  data: _config.store,
}
