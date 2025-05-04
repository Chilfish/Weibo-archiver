import { users } from '@/stories/test.data.js'
import { setup } from '@storybook/vue3'
import { usePublicStore } from '@weibo-archiver/core'
import { createPinia } from 'pinia'
import components from '../src/stories/components'
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
        class="bg-background p-6"
      >
         <story />
      </main>`,
    }),
  ],
}

export default preview
