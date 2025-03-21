import type { Meta, StoryObj } from '@storybook/vue3'
import SwitchUser from '../components/SwitchUser.vue'
import { users } from './test.data'

const meta: Meta<typeof SwitchUser> = {
  title: 'SwitchUser',
  component: SwitchUser,
}

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
  render: () => ({
    components: { SwitchUser },
    template: /* html */`
    <div class="flex flex-col gap-4 bg-gray-300 p-4">
      用户切换
      <SwitchUser :users="users" :cur-uid="users[0].uid" />
    </div>
    `,
    setup() {
      return {
        users,
      }
    },
  }),
}

export const NoUser: Story = {
  render: () => ({
    components: { SwitchUser },
    template: /* html */`
    <div class="flex flex-col gap-4 bg-gray-300 p-4">
      没有用户数据
      <SwitchUser :users="[]" />
    </div>
    `,
  }),
}
