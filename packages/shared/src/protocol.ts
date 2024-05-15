import type { ProtocolMap } from './types'

export const protocolMap: ProtocolMap = {
  img: {
    text: '查看图片',
    reg: /\[img:\/\/(.+?)\]/g,
    /**
     * 解析包含查看图片协议的文本
     * 将返回包含 <ViewImgBtn /> 组件和原文本的 VNode
     */
    parser(text: string, path: string): string {
      return text.replace(this.reg, _ => `
      <button data-src="${path}"><span class="icon i-tabler:photo"></span><span>${this.text}</span></button>
      `.trim())
    },
  },
}

export const protocols = Object.keys(protocolMap)

export function hasProtocol(text: string) {
  const regex = new RegExp(`\\[(${protocols.join('|')}):\/\/(.+?)\\]`, 'g')
  const matches = regex.exec(text)
  if (matches) {
    return {
      protocol: matches[1],
      path: matches[2],
    }
  }
  return null
}

/**
 * 解析自定义协议
 * @TODO 更完善的协议解析
 */
export function parseProtocol(text: string) {
  const res = hasProtocol(text)
  if (!res)
    return text

  const { protocol, path } = res
  const type = protocolMap[protocol]
  return type.parser(text, path)
}
