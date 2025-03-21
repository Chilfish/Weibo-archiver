import type { Meta, StoryObj } from '@storybook/vue3'
import ProfilePanel from '../components/ProfilePanel.vue'
import { users } from './test.data'

const meta: Meta<typeof ProfilePanel> = {
  title: 'Components/ProfilePanel',
  component: ProfilePanel,
}

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
  render: () => ({
    components: {
      ProfilePanel,
    },
    template: /* html */`
  <div class="flex gap-12 overflow-auto h-screen bg-gray-300">
    <div class="w-2/3 bg-gray-400 h-150vh">
      查看用户数据
    </div>
    <ProfilePanel class="w-1/3" :user="user"/>
  </div>
  `,
    setup() {
      return {
        user: users[0],
      }
    },
  }),
}

export const NoUser: Story = {
  render: () => ({
    components: { ProfilePanel },
    template: /* html */`
    <div class="flex gap-12 overflow-auto h-screen bg-gray-300">
      <div class="w-2/3 bg-gray-400 h-150vh">没有用户数据</div>
      <ProfilePanel class="w-1/3" />
    </div>
    `,
  }),
}
