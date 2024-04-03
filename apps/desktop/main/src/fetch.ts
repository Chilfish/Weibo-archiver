import { userDetail, userInfo } from '@shared/services'
import { IPCMain } from '../../utils'
import type { IPCFetch } from '~/types'

const channel = 'fetch'

export function setupFetchMainIPC() {
  const IPC = new IPCMain<IPCFetch>(channel)

  IPC.on('userInfo', userInfo)
  IPC.on('userDetail', userDetail)
}
