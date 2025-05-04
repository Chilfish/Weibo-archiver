import type { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'Shadcn/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: () => ({
    components: { Button },
    template: `<Button
      disabled
      size="lg"
    >
      Hello
    </Button>`,
  }),
}
