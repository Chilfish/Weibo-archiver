import type { Meta, StoryObj } from '@storybook/vue3'
import WeiboCard from '../components/weibo/WeiboCard.vue'
import { weiboPosts } from './test.data'

const meta: Meta<typeof WeiboCard> = {
  title: 'Components/WeiboCard',
  component: WeiboCard,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { WeiboCard },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-128 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post="weiboPosts[0]" />
      </div>
    `,
    setup() {
      return {
        weiboPosts,
      }
    },
  }),
}
