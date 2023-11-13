import type { Meta, StoryObj } from "@storybook/react";
import { ProfileComponent } from ".";

const meta = {
  title: "UI/Profile",
  component: ProfileComponent,
} satisfies Meta<typeof ProfileComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: "John Doe",
      picture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
};
