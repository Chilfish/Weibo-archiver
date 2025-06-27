import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      'light',
      'system',
      'cupcake',
      'dark',
      'emerald',
      'valentine',
      'lofi',
      'dracula',
      'cmyk',
      'business',
      'winter',
    ],
    themeRoot: '#weibo-archiver-plugin',
  },
}
