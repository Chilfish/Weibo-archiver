import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  rules: {
    'no-console': 'off',
    'vue/no-multiple-template-root': 'off',
    'node/prefer-global/process': 'off',
    'format/prettier': 'off',
    'antfu/no-import-dist': 'off',
  },
  ignores: [
    'pnpm-lock.yaml',
  ],
},
)
