import type { Meta, StoryObj } from '@storybook/vue3'
import ImageGallery from '../components/common/ImageGallery.vue'
import { images } from './test.data'

const meta: Meta<typeof ImageGallery> = {
  title: 'Components/ImageGallery',
  component: ImageGallery,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ImageGallery },
    template: /* html */`
      <div class="flex flex-col gap-4 w-200">
        <ImageGallery :images="images" />
        <ImageGallery :images="images" />
      </div>
    `,
    setup() {
      return {
        images,
      }
    },
  }),
}

export const SingleImage: Story = {
  render: () => ({
    components: { ImageGallery },
    template: '<ImageGallery :images="images" />',
    setup() {
      return {
        images: images.slice(0, 1),
      }
    },
  }),
}
