import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["green", "blue", "red"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    type: {
      control: {
        type: "select",
        options: ["button", "submit", "reset"],
      },
    },
    onClick: { action: "clicked" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GreenButton: Story = {
  args: {
    variant: "green",
    size: "md",
    children: "Click me!",
  },
};

export const BlueButton: Story = {
  args: {
    variant: "blue",
    size: "md",
    children: "Click me!",
  },
};

export const RedButton: Story = {
  args: {
    variant: "red",
    size: "md",
    children: "Click me!",
  },
};

export const SmallButton: Story = {
  args: {
    variant: "green",
    size: "sm",
    children: "Click me!",
  },
};

export const LargeButton: Story = {
  args: {
    variant: "green",
    size: "lg",
    children: "Click me!",
  },
};

export const DisabledButton: Story = {
  args: {
    variant: "green",
    size: "lg",
    disabled: true,

    children: "Click me!",
  },
};

export const CustomClassButton: Story = {
  args: {
    variant: "green",
    size: "md",
    className: "border-2 border-green-500",

    children: "Click me!",
  },
};
