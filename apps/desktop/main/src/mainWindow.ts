import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, app, shell } from 'electron'
import { attachTitlebarToWindow, setupTitlebar } from 'custom-electron-titlebar/main'
import contextMenu from 'electron-context-menu'

// setup the titlebar main process
setupTitlebar()

// setup the context menu
contextMenu({
  showCopyImage: true,
  showSaveImageAs: true,
  showSaveImage: true,
})

const {
  DEV: isDev,
  VITE_DEV_SERVER_URL,
} = import.meta.env

async function createWindow() {
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), 'preload/dist/index.mjs'),
    },
  })
  attachTitlebarToWindow(browserWindow)

  browserWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log({ url })
    shell.openExternal(url)
    return { action: 'deny' }
  })

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show()

    if (isDev)
      browserWindow?.webContents.openDevTools()
  })

  console.log('server url:', VITE_DEV_SERVER_URL)
  /**
   * Load the main page of the main window.
   */
  if (isDev && VITE_DEV_SERVER_URL !== undefined) {
    /**
     * Load from the Vite dev server for development.
     */
    await browserWindow.loadURL(VITE_DEV_SERVER_URL)
  }
  else {
    /**
     * Load from the local file system for production and test.
     *
     * Use BrowserWindow.loadFile() instead of BrowserWindow.loadURL() for WhatWG URL API limitations
     * when path contains special characters like `#`.
     * Let electron handle the path quirks.
     * @see https://github.com/nodejs/node/issues/12682
     * @see https://github.com/electron/electron/issues/6869
     */
    await browserWindow.loadFile(
      fileURLToPath(new URL('../../renderer/dist/index.html', import.meta.url)),
    )
  }

  return browserWindow
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (window === undefined)
    window = await createWindow()

  if (window.isMinimized())
    window.restore()

  window.focus()
}
