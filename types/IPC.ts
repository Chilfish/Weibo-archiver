import type { Buffer } from 'node:buffer'

export type FileExt = 'json' | 'js' | '.mjs'

export interface IPCFile {
  selectFolder: () => Promise<string>
  selectFile: (name?: string, ext?: FileExt) => Promise<string>

  readFile: (path: string) => Promise<Buffer | null>
}

export interface IPCFetch {
  userInfo: (id?: string, name?: string) => Promise<{ uid: string, name: string }>
}
