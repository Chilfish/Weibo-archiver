import type { Meta, StoryObj } from '@storybook/vue3'
import { useTemplateRef } from 'vue'
import ImageGallery from '../components/common/ImageGallery.vue'
import ImagePreview from '../components/common/ImagePreview.vue'
import { images } from './test.data'

const meta: Meta<typeof ImagePreview> = {
  title: 'Components/ImagePreview',
  component: ImagePreview,
}

export default meta

type Story = StoryObj<typeof meta>

const url = 'https://wx4.sinaimg.cn/large/008nGzLegy1hznun0avbbj30hw0hwaas.jpg'

export const Default: Story = {
  render: () => ({
    components: {
      ImagePreview,
    },
    template: /* html */`
    <div class="h-screen">
      <img 
        width="200"
        height="200"
        :src="url"
        @click="openImagePreview"
      />
      <ImagePreview
        ref="imagePreviewDialog"
      />
    </div>
    `,
    setup() {
      const imagePreviewDialog = useTemplateRef<typeof ImagePreview>('imagePreviewDialog')
      function openImagePreview() {
        imagePreviewDialog.value?.openImagePreview(url)
      }
      return { url, imagePreviewDialog, openImagePreview }
    },
  }),
}

// 命令式
export const Imperative: Story = {
  render: () => ({
    components: {
      ImagePreview,
      ImageGallery,
    },
    template: /* html */`
    <div class="h-screen w-[50vw] p-6">
      <ImageGallery
        @click="openImagePreview"
        :images="images"
      />
      <ImagePreview ref="imagePreviewDialog" />
    </div>
    `,
    setup() {
      const imagePreviewDialog = useTemplateRef<typeof ImagePreview>('imagePreviewDialog')
      function openImagePreview(src: string) {
        imagePreviewDialog.value?.openImagePreview(src)
      }
      return {
        images,
        imagePreviewDialog,
        openImagePreview,
      }
    },
  }),
}
