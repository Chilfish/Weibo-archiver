import type { Meta, StoryObj } from '@storybook/vue3'
import FilterBar from '../components/FilterBar.vue'

const meta: Meta<typeof FilterBar> = {
  title: 'FilterBar',
  component: FilterBar,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { FilterBar },
    template: '<FilterBar />',
  }),
}
