import { setup } from '@storybook/vue3'
import { usePublicStore } from '@workspace/core'
import { createPinia } from 'pinia'
import components from '../src/stories/components'
import { users } from '../src/stories/test.data'
import '../src/style.css'

setup((app) => {
  app.use(createPinia())

  const publicStore = usePublicStore()
  publicStore.users = users
  publicStore.curUid = users[0].uid

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
      data-theme="winter">
      <story />
      </main>`,
    }),
  ],
}

export default preview
