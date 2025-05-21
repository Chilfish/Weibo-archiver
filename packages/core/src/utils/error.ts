export class WeiboError extends Error {
  constructor(
    message: string,
    code?: string,
  ) {
    super(message)
    this.name = 'WeiboError'
    this.cause = code
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
