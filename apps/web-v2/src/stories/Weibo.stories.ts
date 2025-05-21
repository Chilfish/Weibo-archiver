import type { Meta, StoryObj } from '@storybook/vue3'
import { useStorage } from '@vueuse/core'
import { onMounted } from 'vue'
import ImagePreview from '../components/common/ImagePreview.vue'
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
const withDeleted = weiboPosts[3]
const withVideo = weiboPosts[4]
const withComments = weiboPosts[5]
const withEmoji = weiboPosts[6]
const withInlineImage = weiboPosts[7]

const emojis = useStorage<any[]>('weibo-emojis', [])

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

export const WithDeleted: Story = {
  render: () => ({
    components: { WeiboCard },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
      </div>
    `,
    setup() {
      onMounted(async () => {
        const res = await fetch('http://localhost:3334/emoji.json')
        emojis.value = await res.json()
      })

      return {
        post: withDeleted,
      }
    },
  }),
}

export const WithVideo: Story = {
  render: () => ({
    components: { WeiboCard },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
      </div>
    `,
    setup() {
      return {
        post: withVideo,
      }
    },
  }),
}

export const WithComments: Story = {
  render: () => ({
    components: { WeiboCard, ImagePreview },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
        <ImagePreview />
      </div>
    `,
    setup() {
      return {
        post: withComments,
      }
    },
  }),
}

export const WithEmoji: Story = {
  render: () => ({
    components: { WeiboCard },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
      </div>
    `,
    setup() {
      onMounted(async () => {
        const res = await fetch('http://localhost:3334/emoji.json')
        emojis.value = await res.json()
      })
      return {
        post: withEmoji,
      }
    },
  }),
}

export const WithInlineImage: Story = {
  render: () => ({
    components: { WeiboCard, ImagePreview },
    template: /* html */ `
      <div class="flex flex-col gap-4 w-168 p-4 bg-gray-100 rounded-lg">
        <WeiboCard :post />
        <ImagePreview />
      </div>
    `,
    setup() {
      return {
        post: withInlineImage,
      }
    },
  }),
}
