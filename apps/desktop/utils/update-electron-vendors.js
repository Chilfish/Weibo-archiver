import { writeFileSync } from 'node:fs'

const electronRelease = process.versions

const node = electronRelease.node.split('.')[0]
const chrome = electronRelease.v8.split('.').splice(0, 2).join('')

writeFileSync('.electron-vendors.cache.json', JSON.stringify({ chrome, node }))
writeFileSync('.browserslistrc', `Chrome ${chrome}`, 'utf8')
