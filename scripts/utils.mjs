class Queue {
  constructor() {
    this._queue = []
  }

  enqueue(item) {
    this._queue.push(item)
  }

  dequeue() {
    return this._queue.shift()
  }

  get length() {
    return this._queue.length
  }
}

const defaultOptions = {
  concurrency: Infinity,
  interval: 0,
  delay: 0,
}

/**
 * A promises-based queue.
 */
export class PQueue {
  constructor(options = {}) {
    this._queue = new Queue()
    this._pending = 0
    this._options = { ...defaultOptions, ...options }
  }

  /**
   * Adds a promise to the queue.
   * @param {Function} fn The promise to add.
   */
  add(fn) {
    return new Promise((resolve, reject) => {
      const run = async () => {
        this._pending++
        try {
          if (this._options.delay)
            await new Promise(resolve => setTimeout(resolve, this._options.delay))

          resolve(await fn())
        }
        catch (e) {
          reject(e)
        }
        finally {
          this._pending--
          this._next()
        }
      }

      this._queue.enqueue(run)
      this._next()
    })
  }

  _next() {
    if (this._pending >= this._options.concurrency)
      return

    const run = this._queue.dequeue()
    if (run)
      run()
  }

  /**
   * Waits for the queue to be empty.
   */
  async onIdle() {
    return new Promise((resolve) => {
      const check = () => {
        if (this._queue.length === 0 && this._pending === 0)
          resolve()
        else
          setTimeout(check, this._options.interval)
      }

      check()
    })
  }

  /**
   * Clears the queue.
   */
  clear() {
    this._queue = new Queue()
  }
}

function try2Number(value) {
  return Number.isNaN(Number(value)) ? value : Number(value)
}

/**
 * A simple command line argument parser.
 */
export class Argv {
  static get(name) {
    const index = process.argv.indexOf(name)
    if (index === -1)
      return null

    return process.argv[index + 1]
  }

  static showOptions(
    { key, shortKey, description, defaultValue = '', type = 'string' } = {},
  ) {
    const showDefault = defaultValue !== '' ? ` (default: ${defaultValue})` : ''
    return `  --${key}, -${shortKey}\t${description} (${type})${showDefault}`
  }

  static help(
    options = [],
    { name, description, version } = {},
  ) {
    let info = ''
    if (name)
      info += `${name}`
    if (version)
      info += ` v${version}`
    if (description)
      info += ` - ${description}`

    if (info)
      console.log(`${info}\n`)

    const fileName = process.argv[1].replaceAll('\\', '/').split('/').at(-1)
    console.log(`Usage: node ${fileName} [options]`)
    console.log('Options:')

    const optionStr = []
    for (const option of options)
      optionStr.push(Argv.showOptions(option))
    console.log(optionStr.join('\n'))

    console.log('  --help, -h\tShow this help message')
  }

  static parse(options) {
    const argv = { }
    for (let i = 2; i < process.argv.length; i++) {
      const arg = process.argv[i]
      if (!arg.startsWith('-'))
        continue

      const sliceLen = arg.startsWith('--') ? 2 : 1
      const key = arg.slice(sliceLen)

      if (key === 'help' || key === 'h') {
        argv.help = true
        break
      }

      const value = process.argv[i + 1] || true
      const option = options.find(option => option.key === key || option.shortKey === key)
      if (option) {
        argv[option.key] = try2Number(value)
      }
    }

    for (const option of options) {
      if (argv[option.key] === undefined)
        argv[option.key] = option.defaultValue

      if (typeof option.beforeSet === 'function')
        argv[option.key] = option.beforeSet(argv[option.key])
    }

    return argv
  }

  static init(options, info = {}) {
    const argv = Argv.parse(options)
    if (argv.help) {
      Argv.help(options, info)
      process.exit(0)
    }
    return argv
  }
}

// test
// const options = [
//   { key: 'file', shortKey: 'f', description: 'The file path', defaultValue: 'imgs.csv' },
//   { key: 'output', shortKey: 'o', description: 'The output path' },
// ]
// const argv = Argv.init(options, {
//   name: 'download',
//   description: 'Download images from a csv file',
//   version: '1.0.0',
// })

// console.log(argv)
