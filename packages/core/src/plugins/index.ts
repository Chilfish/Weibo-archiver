import path from 'node:path'

export const src = path.resolve(__dirname, '..')
export const previewDir = path.resolve(src, '../../preview')
export const root = path.resolve(src, '../../../')
export const packages = path.resolve(root, 'packages')
export const dist = path.resolve(root, 'dist')

export * from './initData'
