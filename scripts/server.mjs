import { execSync as exec } from 'node:child_process'

console.log('启动服务器中，请在浏览器中打开接下来中的一个链接')

exec('npx vite --open --host', { stdio: 'inherit' })
