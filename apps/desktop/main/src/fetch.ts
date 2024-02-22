import type { IPCFetch } from '@types'
import { userInfo } from '@core/utils'
import { IPCMain } from '../../utils'

const channel = 'fetch'

export function setupFetchMainIPC() {
  const IPC = new IPCMain<IPCFetch>(channel)

  IPC.on('userInfo', userInfo)
}
