import type { Meta, StoryObj } from '@storybook/vue3'
import AlbumPhotos from '@/components/album/AlbumPhotos.vue'

const meta: Meta<typeof AlbumPhotos> = {
  title: 'Components/Album',
  component: AlbumPhotos,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { AlbumPhotos },
    template: `
    <AlbumPhotos />
    `,
  }),
}
