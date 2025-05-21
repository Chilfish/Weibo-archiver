import type { Meta, StoryObj } from '@storybook/vue3'
import LazyImage from '../components/common/LazyImage.vue'

const meta: Meta<typeof LazyImage> = {
  title: 'Components/LazyImage',
  component: LazyImage,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { LazyImage },
    template: /* html */ `
      <div class="mt-200 p-4 bg-gray-100">
        <LazyImage 
        class="h-64 w-120 object-cover"
        src="https://proxy.chilfish.top/?url=https://i0.hdslb.com/bfs/archive/b598c654984ed7ef73e962b53d9bf3f2b5b5fd0c.jpg" />
      </div>
    `,
  }),
}
