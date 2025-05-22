import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import components from '../src/stories/components'
import '../src/style.css'

setup((app) => {
  app.use(createPinia())
  components.forEach((component) => {
    app.component(component.name, component)
  })
})

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    story => ({
      components: { story },
      template: `<main
        class="bg-background p-6"
      >
         <story />
      </main>`,
    }),
  ],
}

export default preview
