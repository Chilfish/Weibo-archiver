import { dialog } from 'electron'
import fs from 'fs-extra'

import type { FileExt, IPCFile } from '@types'
import { mainLog } from './logs'
import { IPCMain, IPCRenderer } from './index'

const channel = 'files'

const selectFolder: IPCFile['selectFolder'] = async function () {
  const { canceled, filePaths: [path] } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  })

  if (canceled)
    return ''

  return path
}

const selectFile: IPCFile['selectFile'] = async function (name = 'Config', ext = 'json') {
  const { canceled, filePaths: [path] } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name, extensions: [ext] }],
  })

  if (canceled)
    return ''

  return path
}

const readFile: IPCFile['readFile'] = async function (path) {
  try {
    const buffer = await fs.readFile(path)
    return buffer
  }
  catch (error) {
    mainLog.error(`Error reading file ${error}`)
    return null
  }
}

export function registerFileMainIPC() {
  const IPC = new IPCMain<IPCFile>(channel)
  IPC.on('selectFolder', selectFolder)
  IPC.on('selectFile', selectFile)
  IPC.on('readFile', readFile)
}

export function registerFileRendererIPC() {
  const IPC = new IPCRenderer<IPCFile>(channel)

  return {
    selectFolder: () => IPC.send('selectFolder'),
    selectFile: (name?: string, ext?: FileExt) => IPC.send('selectFile', name, ext),
    readFile: (path: string) => IPC.send('readFile', path),
  }
}
