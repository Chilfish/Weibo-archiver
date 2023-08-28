import path from 'node:path'

export const src = path.resolve(__dirname, '..')
export const previewDir = path.resolve(src, '../../preview')
export const root = path.resolve(src, '../../../')
export const dist = path.resolve(root, 'dist')

export * from './initData'
