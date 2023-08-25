const protocols = [
  'img',
  'emoji',
]

/**
 * 解析自定义协议
 * @param protocol `[${protocol}://${path}]`
 * @TODO 更完善的协议解析
 */
export function parseProtocol(protocol: string): string {
  const [type, ...path] = protocol.split('://')
  if (!protocols.includes(type))
    return protocol

  switch (type) {
    case 'img':
      return path.join('://')

    default:
      return protocol
  }
}

/**
 * 解析包含自定义协议的文本
 * @example
 * useProtocol('你看这个 [img://https://example.com/1.jpg]，2333, [img://https://example.com/2.jpg]')
 * // =>
 * {
 *    text: '你看这个 [$1] ，2333, [$2]',
 *    imgs: ['https://example.com/1.jpg', 'https://example.com/2.jpg']
 * }
 */
export function useProtocol(text: string) {
  if (text === parseProtocol(text)) {
    return {
      text,
      imgs: [],
    }
  }

  const imgs = [] as string[]
  const parsed = text.replace(/\[(.+?)\]/gm, (_, protocol) => {
    const parsedProtocol = parseProtocol(protocol)
    if (parsedProtocol !== protocol)
      imgs.push(parsedProtocol)

    return `[$${imgs.length}]`
  })

  return {
    text: parsed,
    imgs,
  }
}
