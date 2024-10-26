import * as fs from 'node:fs'
import * as http from 'node:http'
import * as path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { promisify } from 'node:util'
import { createGzip } from 'node:zlib'

const access = promisify(fs.access)
const createReadStream = fs.createReadStream

const folder = 'images'
const folderPath = path.join(process.cwd(), folder)

if (!fs.existsSync(folderPath)) {
  console.error(`图片文件夹 ${folderPath} 不存在`)
  process.exit(1)
}

const server = http.createServer(async (req, res) => {
  const filePath = path.join(folderPath, req.url)

  try {
    await access(filePath, fs.constants.F_OK)

    const fileStream = createReadStream(filePath)
    const compressStream = createGzip()

    res.setHeader('Content-Encoding', 'gzip')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString())

    await pipeline(fileStream, compressStream, res)
  }
  catch {
    res.statusCode = 404
    res.end(`File not found: ${req.url}`)
  }
})

function startServer(port) {
  server.listen(port)
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`端口 ${port} 已被占用，尝试使用其他端口...`)
      server.close()
      startServer(port + 1)
    }
    else {
      console.error('服务器启动失败:', err)
    }
  })

  server.on('listening', () => {
    console.log(`图片服务器已在 http://localhost:${port} 中启动`)
  })
}

const port = 3000
startServer(port)
console.log('图片文件夹：', folderPath)
