import { defineExtensionStorage } from '@webext-core/storage'
import browser from 'webextension-polyfill'

export interface ExtensionStorageSchema {
  cookies: string
}

export const extensionStorage = defineExtensionStorage<ExtensionStorageSchema>(
  browser.storage.local,
)
