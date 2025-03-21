import type { Meta, StoryObj } from '@storybook/vue3'
import type { UserInfo } from '@workspace/shared'
import ProfilePanel from '../components/ProfilePanel.vue'

const meta: Meta<typeof ProfilePanel> = {
  title: 'ProfilePanel',
  component: ProfilePanel,
}

type Story = StoryObj<typeof meta>

export default meta

const user: UserInfo = {
  uid: 'uid-1',
  name: 'Jessica Chen',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&auto=format&fit=crop&crop=face',
  bio: '数字营销专家 | 美食爱好者 | 旅行达人',
  followers: 1284,
  followings: 578,
  createdAt: '2021-01-01',
  birthday: '1990-01-01',
  postCount: 1284,
}

export const Default: Story = {
  render: () => ({
    components: {
      ProfilePanel,
    },
    template: /* html */`
  <div class="flex gap-12 overflow-auto h-screen bg-gray-300">
    <div class="w-2/3 bg-gray-400 h-150vh">main</div>
    <ProfilePanel class="w-1/3" :user="user"/>
  </div>
  `,
    setup() {
      return {
        user,
      }
    },
  }),
}
