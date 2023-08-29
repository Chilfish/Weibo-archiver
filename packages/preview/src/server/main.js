import process from 'node:process'
import express from 'express'

// eslint-disable-next-line import/default
import ViteExpress from 'vite-express'
import search, { init } from './search.js'

const app = express()

ViteExpress.config({
  mode: process.env.NODE_ENV,
  inlineViteConfig: {
    build: { outDir: '../client' },
  },
})

app.get('/search', (req, res) => {
  const { q } = req.query
  const ids = search(decodeURIComponent(q))
  res.json({
    ids,
    count: ids.length,
  })
})

ViteExpress.listen(app, 3003, async () => {
  console.log('Server is listening on port 3003...')
  init()
})
