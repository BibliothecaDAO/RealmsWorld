import type { Meta, StoryObj } from "@storybook/react";
import { HammerIcon } from "lucide-react";

import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

const menu = [
  {
    name: "Games",
    href: "/games",
    icon: <HammerIcon className="w-[29px] fill-current" />,
  },
  {
    name: "Collections",
    href: "/collection",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Events",
    href: "/events",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Bridge",
    href: "/bridge",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Staking",
    href: "/staking",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Games",
    href: "/games",
    icon: <HammerIcon className="w-[29px] fill-current" />,
  },
  {
    name: "Collections",
    href: "/collection",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Events",
    href: "/events",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Bridge",
    href: "/bridge",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Staking",
    href: "/staking",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Games",
    href: "/games",
    icon: <HammerIcon className="w-[29px] fill-current" />,
  },
  {
    name: "Collections",
    href: "/collection",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Events",
    href: "/events",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Bridge",
    href: "/bridge",
    icon: <HammerIcon className="w-[25px]" />,
  },
  {
    name: "Staking",
    href: "/staking",
    icon: <HammerIcon className="w-[25px]" />,
  },
];

export const Base: Story = {
  render: (args) => (
    <div
      className={
        "z-100 group fixed bottom-0 top-0 z-20 h-screen w-screen flex-col border-r-[3px] bg-dark-green transition-all duration-500 md:flex md:w-[102px] md:hover:w-60"
      }
    >
      <div className="mt-[60px] h-full w-full border-t-[3px] pb-3">
        <div className="relative z-10 m-2 mt-0 h-full border-[3px] border-t-0 border-solid border-transparent group-hover:!border-medium-dark-green">
          <div className="relative flex h-full flex-col items-center">
            <ScrollArea className="w-full">
              <div className="relative z-[2] inline-flex w-full flex-[0_0_auto] flex-col items-start justify-center gap-[17px] px-4 md:mb-6 md:mt-10">
                {menu.map((item, index) => {
                  return (
                    <Button
                      className="group flex w-full justify-normal px-2 font-sans-serif text-lg normal-case text-bright-yellow transition-all duration-200"
                      key={index}
                      variant={"ghost"}
                    >
                      <span className="absolute">{item.icon}</span>

                      <span className="visible absolute pl-9 opacity-100 transition-opacity group-hover:visible group-hover:flex group-hover:opacity-100 group-hover:delay-150 group-hover:duration-500 sm:opacity-0 ">
                        {item.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {},
};
