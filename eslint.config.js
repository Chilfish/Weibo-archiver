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
    'antfu/top-level-function': 'off',
    'antfu/no-top-level-await': 'off',
  },
  ignores: [
    'pnpm-lock.yaml',
  ],
},
)
