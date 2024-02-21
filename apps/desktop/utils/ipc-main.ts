import { BrowserWindow, ipcMain } from 'electron'

type MessageObj<T> = {
  [K in keyof T]: (...args: any) => void;
}

export class IPCMain<
  MessageType extends MessageObj<MessageType>,
  BackgroundMessageType extends MessageObj<BackgroundMessageType> = MessageType,
> {
  channel: string
  listeners: Partial<Record<keyof MessageType, any>> = {}

  constructor(channel = 'IPC-bridge') {
    this.channel = channel
    this._bindMessage()
  }

  on<T extends keyof MessageType>(
    name: T,
    fn: (...args: Parameters<MessageType[T]>) => ReturnType<MessageType[T]>,
  ): void {
    if (this.listeners[name])
      throw new Error(`消息处理器 ${String(name)} 已存在`)
    this.listeners[name] = fn
  }

  off<T extends keyof MessageType>(
    action: T,
  ): void {
    if (this.listeners[action])
      delete this.listeners[action]
  }

  async send<T extends keyof BackgroundMessageType>(
    name: T,
    ...payload: Parameters<BackgroundMessageType[T]>
  ): Promise<void> {
    // 获取所有打开的窗口
    const windows = BrowserWindow.getAllWindows()

    // 向每个窗口发送消息
    windows.forEach((window) => {
      window.webContents.send(this.channel, {
        name,
        payload,
      })
    })
  }

  private _bindMessage() {
    ipcMain.handle(this.channel, this._handleReceivingMessage.bind(this))
  }

  private async _handleReceivingMessage(
    _: any,
    payload: { name: keyof MessageType, payload: any },
  ) {
    try {
      if (this.listeners[payload.name]) {
        const res = await this.listeners[payload.name](...payload.payload)
        return {
          type: 'success',
          result: res,
        }
      }
      else {
        throw new Error(`未知的 IPC 消息 ${String(payload.name)}`)
      }
    }
    catch (e: any) {
      return {
        type: 'error',
        error: e.toString(),
      }
    }
  }
}
