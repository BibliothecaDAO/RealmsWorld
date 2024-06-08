import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import { HammerIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu";

const communityLinks = [
  {
    title: "Frontinus House",
    href: "https://frontinus.house",
    icon: <HammerIcon className="w-5 fill-current" />,
  },
  {
    title: "Blog",
    href: "blog",
    icon: <HammerIcon className="w-5" />,
  },
  {
    title: "Studios",
    href: "studios",
    icon: <HammerIcon className="w-5" />,
  },
];

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Base: Story = {
  render: (args) => (
    <div className="hidden w-auto border-b-[3px] bg-dark-green p-3 pl-4 sm:flex sm:pl-8 md:pl-32">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-sans-serif text-bright-yellow">
                Community
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[250px] flex-col py-1.5">
                  {communityLinks.map((link, index) => {
                    return (
                      <li
                        key={index}
                        className="font-sans-serif text-bright-yellow"
                      >
                        <NavigationMenuLink
                          className="transition-all hover:bg-bright-yellow/10"
                          asChild
                        >
                          <Link
                            href={link.href}
                            className="block px-4 py-2 font-semibold tracking-wide"
                          >
                            <div className="flex">
                              {link.icon}{" "}
                              <span className="ml-3">{link.title}</span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ),
  args: {},
};
