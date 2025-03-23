import type { Meta, StoryObj } from '@storybook/vue3'
import Settings from '../components/settings/Settings.vue'

const meta: Meta<typeof Settings> = {
  title: 'Components/Settings',
  component: Settings,
}

export default meta

type Story = StoryObj<typeof Settings>

export const Default: Story = {
  render: () => ({
    components: { Settings },
    template: /* html */ `
    <modal
    open 
    class="modal">
      <Settings class="modal-box" />
    </modal>
    `,
  }),
}
