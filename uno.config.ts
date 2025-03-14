import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  theme: {
    colors: {
      'p-1': '#ea8011',
      'p-2': '#e5857b',
      'p-3': '#f1b2b2',
      'p-4': '#e8ccc7',
      'p-5': '#7d8bae',
      'p-6': '#45496a',
      'primary': '#ea8011',
      'primary-foreground': '#fff',
      'secondary': '#18a058',
      'secondary-foreground': '#fff',
    },
  },
  shortcuts: [
    {
      btn: 'p-2 rounded inline-block bg-orange hover:bg-orange-5 text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-3 disabled:opacity-50',
    },
    {
      'center': 'flex justify-center items-center',
      'center-col': 'center flex-col',
    },
    {
      'icon': 'h-4 w-4 cursor-pointer inline-block',
      'icon-btn': 'rounded-full p-2 center',
    },
  ],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetAnimations(),
    presetShadcn(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    'i-tabler:photo',
  ],
  content: {
    pipeline: {
      include: [/\.(vue|ts|tsx|html)($|\?)/],
      exclude: [
        'apps/monkey/*',
      ],
    },
  },
})
