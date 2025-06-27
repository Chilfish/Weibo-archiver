import type { App } from 'vue'
import { vExtensionCheck } from './extensionCheck'

export { checkExtensionConnection, isConnectedToExtension, vExtensionCheck } from './extensionCheck'

export function installDirectives(app: App) {
  app.directive('extension-check', vExtensionCheck)
}
