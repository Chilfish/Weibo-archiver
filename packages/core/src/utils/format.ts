import type { DateValue } from '@internationalized/date'
import { parseAbsolute } from '@internationalized/date'

/**
 * Format the date string
 * @param time the date string
 * @param fmt the format string, e.g. `YYYY-MM-DD HH:mm:ss`
 */
export function formatDate(
  time: string | number | Date,
  fmt = 'YYYY-MM-DD HH:mm:ss',
) {
  if (typeof time === 'number' && time < 1e12)
    time *= 1000

  const date = new Date(time)
  if (Number.isNaN(date.getTime()))
    return ''

  const pad = (num: number) => num.toString().padStart(2, '0')

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // Months are zero-based
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return fmt
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * Format the number
 * @param num the number
 * @param precision the precision
 */
export function formatNumber(num: number, precision = 2) {
  const wan = 1_0000
  const yi = 1_0000_0000

  if (num < wan)
    return `${num}`
  else if (num < yi)
    return `${(num / wan).toFixed(precision)}万`
  else
    return `${(num / yi).toFixed(precision)}亿`
}

export function toDateValue(date: string | number | Date): DateValue {
  return parseAbsolute(new Date(date).toISOString(), 'Asia/Shanghai')
}
