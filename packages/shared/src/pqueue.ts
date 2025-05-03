export type PromiseFn<T = any> = (...args: any[]) => Promise<T>

class Queue<T = any> {
  private _queue: T[]
  private _head: number

  constructor() {
    this._queue = []
    this._head = 0
  }

  enqueue(item: T) {
    this._queue.push(item)
  }

  dequeue(): T | undefined {
    if (this._head >= this._queue.length)
      return undefined

    const item = this._queue[this._head]
    this._head++

    // 定期清理已出队元素，避免内存泄漏
    if (this._head > 100 && this._head > this._queue.length / 2) {
      this._queue = this._queue.slice(this._head)
      this._head = 0
    }

    return item
  }

  get length() {
    return this._queue.length - this._head
  }
}

export interface PQueueOptions {
  /**
   * The maximum number of concurrent promises.
   * @default Infinity
   */
  concurrency: number
}

const defaultOptions = {
  concurrency: Infinity,
} satisfies PQueueOptions

export class PQueue {
  private _queue: Queue<() => Promise<void>>
  private _pending = 0
  private _options: PQueueOptions
  private _idleResolvers: (() => void)[] = []

  constructor(options: Partial<PQueueOptions> = {}) {
    this._queue = new Queue()
    this._options = { ...defaultOptions, ...options }
  }

  add<T>(fn: PromiseFn<T>): Promise<T> {
    return new Promise<Awaited<ReturnType<typeof fn>>>((resolve, reject) => {
      const run = async () => {
        this._pending++

        try {
          resolve(await fn())
        }
        catch (e) {
          reject(e)
        }
        finally {
          this._pending--
          this._next()
          this._checkIdle()
        }
      }

      this._queue.enqueue(run)
      this._next()
    })
  }

  addAll(fns: PromiseFn[]) {
    return Promise.all(fns.map(fn => this.add(fn)))
  }

  private _next() {
    while (this._pending < this._options.concurrency) {
      const task = this._queue.dequeue()
      if (!task)
        break
      task()
    }
  }

  async onIdle() {
    if (this._isEmpty)
      return Promise.resolve()

    return new Promise<void>((resolve) => {
      this._idleResolvers.push(resolve)
    })
  }

  clear() {
    this._queue = new Queue()
  }

  get length() {
    return this._queue.length
  }

  get pending() {
    return this._pending
  }

  private _checkIdle() {
    if (!this._isEmpty)
      return

    // console.log('idle', this._idleResolvers.length)
    for (const resolve of this._idleResolvers)
      resolve()
    this._idleResolvers = []
  }

  private get _isEmpty() {
    return this.length === 0 && this.pending === 0
  }
}
