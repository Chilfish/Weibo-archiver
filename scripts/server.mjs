import * as http from 'node:http'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as zlib from 'node:zlib'

const server = http.createServer((req, res) => {
  const filePath = path.join('images', req.url)

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404
      res.end('File not found')
    }
    else {
      // 使用流式传输将文件发送给客户端，并使用压缩
      const fileStream = fs.createReadStream(filePath)
      const compressStream = fileStream.pipe(zlib.createGzip())

      res.setHeader('Content-Encoding', 'gzip')
      res.setHeader('Cache-Control', 'public, max-age=3600') // 缓存1小时
      res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString()) // 过期时间为1小时后

      compressStream.pipe(res)
    }
  })
})

function startServer(port) {
  server.listen(port)
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`端口 ${port} 已被占用，尝试使用其他端口...`)
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
