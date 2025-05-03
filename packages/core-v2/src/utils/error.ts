export class WeiboError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WeiboError'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
