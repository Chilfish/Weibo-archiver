import type { Meta, StoryObj } from '@storybook/vue3'
import WeiboCard from '../components/weibo/Weibo.vue'
import { weiboPosts } from './test.data'

const meta: Meta<typeof WeiboCard> = {
  title: 'Components/WeiboCard',
  component: WeiboCard,
}

export default meta

type Story = StoryObj<typeof meta>

const with9Images = weiboPosts[0]
const withRetweet = weiboPosts[1]
const withLinkCard = weiboPosts[2]

export const With9Images: Story = {
  render: () => ({
    components: { WeiboCard },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
      </div>
    `,
    setup() {
      return {
        post: with9Images,
      }
    },
  }),
}

export const WithRetweet: Story = {
  render: () => ({
    components: { WeiboCard },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
      </div>
    `,
    setup() {
      return {
        post: withRetweet,
      }
    },
  }),
}

export const WithLinkCard: Story = {
  render: () => ({
    components: { WeiboCard },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
      </div>
    `,
    setup() {
      return {
        post: withLinkCard,
      }
    },
  }),
}
