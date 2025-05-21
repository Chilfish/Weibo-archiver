import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Giscus from '../components/Giscus.vue'
import Layout from '../components/Layout.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Giscus', Giscus)
  },
  Layout,
} satisfies Theme
