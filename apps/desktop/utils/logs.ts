import MainLog from 'electron-log/main'

MainLog.initialize({ spyRendererConsole: false })

MainLog.transports.file.level = 'debug'
MainLog.transports.console.level = 'debug'

if (process.env.NODE_ENV === 'production')
  MainLog.transports.file.level = 'error'

export const log = MainLog
export const mainLog = MainLog.scope('main')
