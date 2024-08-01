import type { Meta, StoryObj } from "@storybook/react";

import type { Toast as ToastProps } from "../use-toast";
import { Button } from "../button";
import { ToastAction } from "../toast";
import { useToast } from "../use-toast";

const ToastDemo = (props: ToastProps) => {
  const { toast } = useToast();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            ...props,
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
};

const meta: Meta<typeof ToastDemo> = {
  title: "ui/Toast",
  component: ToastDemo,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ToastDemo>;

export const Simple: Story = {
  args: {
    description: "Your message has been sent.",
  },
};

export const WithTitle: Story = {
  args: {
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your request.",
  },
};

export const WithAction: Story = {
  args: {
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your request.",
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your request.",
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Your message has been sent.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Info",
    description: "Your message has been sent.",
  },
};
