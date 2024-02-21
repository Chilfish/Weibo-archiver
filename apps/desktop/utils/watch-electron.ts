#!/usr/bin/env node

import type { ChildProcess } from 'node:child_process'
import { spawn } from 'node:child_process'
import type { InlineConfig, LogLevel, ViteDevServer } from 'vite'
import { build, createLogger, createServer } from 'vite'
import electronPath from 'electron'

const mode = process.env.MODE || 'development'
const LOG_LEVEL = 'warn' as LogLevel

const sharedConfig: InlineConfig = {
  mode,
  build: {
    watch: {},
  },
  logLevel: LOG_LEVEL,
}

/** Messages on stderr that match any of the contained patterns will be stripped from output */
const stderrFilterPatterns = [
  // warning about devtools extension
  // https://github.com/cawa-93/vite-electron-builder/issues/492
  // https://github.com/MarshallOfSound/electron-devtools-installer/issues/143
  /ExtensionLoadWarning/,
]

function getWatcher(
  { name, configFile, writeBundle }: {
    name: string
    configFile: string
    writeBundle: import('rollup').OutputPlugin['writeBundle']
  },
) {
  return build({
    ...sharedConfig,
    configFile,
    plugins: [{ name, writeBundle }],
  })
}

/**
 * Setup watcher for `main` package
 * On file changed it totally re-launch electron app.
 * @param {ViteDevServer} watchServer Renderer watch server instance.
 * Needs to set up `VITE_DEV_SERVER_URL` environment variable from {@link ViteDevServer.resolvedUrls}
 */
function setupMainPackageWatcher({ resolvedUrls }: ViteDevServer) {
  process.env.VITE_DEV_SERVER_URL = resolvedUrls?.local[0] ?? 'http://localhost:5173'

  let electronApp: ChildProcess | null = null

  const logger = createLogger(LOG_LEVEL, {
    prefix: '[main]',
  })

  return getWatcher({
    name: 'reload-app-on-main-package-change',
    configFile: './main/vite.config.ts',

    writeBundle() {
      /** Kill electron if process already exist */
      if (electronApp !== null) {
        electronApp.off('exit', process.exit)
        electronApp.kill('SIGINT')
        electronApp = null
      }

      /** Spawn new electron process */
      electronApp = spawn(String(electronPath), ['--inspect', '.'], {
        stdio: 'inherit',
      })

      electronApp.stdout?.on('data', (data) => {
        const message = data.toString().trim()
        message && logger.info(message)
      })
      electronApp.stderr?.on('data', (data) => {
        const message = data.toString().trim()
        if (!stderrFilterPatterns.some(pattern => pattern.test(message)))
          logger.error(message, { timestamp: true })
      })

      /** Stops the watch script when the application has been quit */
      electronApp.on('exit', process.exit)
    },

  })
}

/**
 * Setup watcher for `preload` package
 * On file changed it reload web page.
 * @param {ViteDevServer} watchServer Renderer watch server instance.
 * Required to access the web socket of the page. By sending the `full-reload` command to the socket, it reloads the web page.
 */
function setupPreloadPackageWatcher({ hot }: ViteDevServer) {
  return getWatcher({
    name: 'reload-page-on-preload-package-change',
    configFile: './preload/vite.config.ts',
    writeBundle() {
      hot.send({
        type: 'full-reload',
      })
    },
  })
}

(async () => {
  /**
   * Dev server for Renderer package
   * This must be the first,
   * because the {@link setupMainPackageWatcher} and {@link setupPreloadPackageWatcher}
   * depend on the dev server properties
   */
  const rendererWatchServer = await createServer({
    ...sharedConfig,
    configFile: './renderer/vite.config.ts',
  }).then(s => s.listen())

  await setupPreloadPackageWatcher(rendererWatchServer)
  await setupMainPackageWatcher(rendererWatchServer)
})()
