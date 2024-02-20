import { ipcRenderer } from 'electron'

type MessageObj<T> = {
  [K in keyof T]: (...args: any) => void;
}

export class IPCRenderer<
  MessageType extends MessageObj<MessageType>,
  BackgroundMessageType extends MessageObj<BackgroundMessageType> = MessageType,
> {
  channel: string
  listeners: Partial<Record<keyof BackgroundMessageType, any>> = {}

  constructor(channel = 'IPC-bridge') {
    this.channel = channel
    this._bindMessage()
  }

  async send<T extends keyof MessageType>(
    name: T,
    ...payload: Parameters<MessageType[T]>
  ): Promise<Awaited<ReturnType<MessageType[T]>>> {
    const data = await ipcRenderer.invoke(this.channel, {
      name: String(name),
      payload,
    })

    /**
     * 不是从 {@link IPCMain} 发送的消息
     */
    if (!Object.prototype.hasOwnProperty.call(data, 'type'))
      return data

    if (data.type === 'error')
      throw new Error(data.error)

    return data.result
  }

  on<T extends keyof BackgroundMessageType>(
    name: T,
    fn: (...args: Parameters<BackgroundMessageType[T]>) => void,
  ): () => void {
    this.listeners[name] = this.listeners[name] || []
    this.listeners[name].push(fn)

    return () => {
      if (this.listeners[name].includes(fn)) {
        const index = this.listeners[name].indexOf(fn)
        this.listeners[name].splice(index, 1)
      }
    }
  }

  private _handleReceivingMessage(
    _: any,
    payloadData: { name: keyof BackgroundMessageType, payload: any },
  ) {
    const { name, payload } = payloadData

    if (this.listeners[name]) {
      this.listeners[name].forEach((fn: any) => {
        fn(...payload)
      })
    }
  }

  private _bindMessage() {
    ipcRenderer.on(this.channel, this._handleReceivingMessage.bind(this))
  }
}
