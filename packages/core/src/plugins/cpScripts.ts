import fs from 'node:fs/promises'
import path from 'node:path'
import { dist, root } from '.'

/**
 * 将 /Scripts 中的文件复制到 /dist/preview 中
 */
export function CpScripts() {
  return {
    name: 'cpScripts',
    async buildEnd() {
      const scriptsDir = path.resolve(root, 'scripts')
      await fs.mkdir(path.resolve(dist, 'preview/scripts'), { recursive: true })
      const files = await fs.readdir(scriptsDir)
      for (const file of files) {
        await fs.copyFile(
          path.resolve(scriptsDir, file),
          path.resolve(dist, 'preview/scripts', file),
        )
      }
    },
  }
}
