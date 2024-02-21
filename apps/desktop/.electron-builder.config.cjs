/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'top.chilfish.weibo-archiver',
  productName: 'Weibo Archiver',
  asar: true,
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: ['./**/dist/**'],
  extraResources: [
    './weibo-data.db',
  ],
}

exports.default = config
