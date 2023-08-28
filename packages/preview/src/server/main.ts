import process from 'node:process'
import express from 'express'

// eslint-disable-next-line import/default
import ViteExpress from 'vite-express'

const app = express()

ViteExpress.config({
  mode: process.env.NODE_ENV as 'development' | 'production',
  inlineViteConfig: {
    build: { outDir: '../client' },
  },
})

app.get('/hello', (_, res) => {
  res.send('Hello Vite + Vue + TypeScript!')
})

ViteExpress.listen(app, 3003, () =>
  console.log('Server is listening on port 3003...'),
)
