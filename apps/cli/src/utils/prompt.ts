import { consola } from 'consola'

/**
 * 交互式输入文本
 */
export async function textPrompt(mes: string, placeholder?: string) {
  const value = await consola.prompt(mes, {
    type: 'text',
    placeholder,
  }).then(r => r?.trim())

  return value || ''
}

/**
 * 交互式输入日期
 */
export async function datePrompt(mes: string) {
  const date = await textPrompt(mes, '2024-01-01')

  try {
    const time = new Date(date).getTime()

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date)
      || time < 0
      || time > Date.now()
      || Number.isNaN(time)
    ) {
      throw new Error('日期格式不正确')
    }

    return time
  }
  catch {
    consola.error('日期格式不正确，格式如：2024-01-01')
    return datePrompt(mes)
  }
}

/**
 * 交互式输入数字
 */
export async function numberPrompt(
  mes: string,
  validate?: (num: number) => boolean,
) {
  const num = await textPrompt(mes)

  try {
    const n = Number(num)

    if (
      Number.isNaN(n)
      || !Number.isFinite(n)
      || (validate && !validate(n))
    ) {
      throw new Error('请输入数字')
    }

    return n
  }
  catch {
    consola.error('请输入合规的数字')
    return numberPrompt(mes)
  }
}
