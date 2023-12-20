import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu({
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'vue/no-multiple-template-root': 'off',
    'node/prefer-global/process': 'off',
  },
}, {
  ignores: [
    'dist',
    '.output',
    'node_modules',
    '*.py',
  ],
}, unocss.configs.flat)
