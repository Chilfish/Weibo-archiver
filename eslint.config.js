// root 必须是 common.js 模块，不然 pnpm build:monkey 会报错...

const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  stylistic: true, // enable stylistic formatting rules
  typescript: true,
  vue: true,
  jsonc: false,
  yml: false,
}, {
  rules: {
    'no-console': 'off',
    'vue/no-multiple-template-root': 'off',
  },
}, {
  ignores: [
    'data.mjs',
    'dist',
    '*.py',
    'node_modules',
    '*.webp',
  ],
})
