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
  if (num < 1000)
    return num
  if (num < 10000)
    return `${(num / 1000).toFixed(precision)}k`
  return `${(num / 10000).toFixed(precision)}w`
}
