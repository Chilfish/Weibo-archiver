import type { Buffer } from 'node:buffer'

export type FileExt = 'json' | 'js' | '.mjs'

export interface IPCFile {
  selectFolder: () => Promise<string>
  selectFile: (name?: string, ext?: FileExt) => Promise<string>

  readFile: (path: string) => Promise<Buffer | null>
}
