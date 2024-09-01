"use client";

import Link from "next/link";
import Bookmark from "@/icons/bookmark.svg";
import PieChart from "@/icons/pie-chart.svg";
import RealmsL3 from "@/icons/realms_l3.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { HammerIcon, Menu /*, ShieldQuestion*/ } from "lucide-react";
import Crown from "@/icons/crown.svg";
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@realms-world/ui";

import { EthereumLoginButton } from "./wallet/EthereumLoginButton";
import { LordsDropdown } from "./wallet/LordsDropdown";
import { StarknetLoginButton } from "./wallet/StarknetLoginButton";

export const TopNav = () => {
  const { toggleSidebar } = useUIStore((state) => state);

  const aboutLinks = [
    /*{
      title: "What is Realms.World",
      href: "info",
      icon: <ShieldQuestion className="w-5" />,
    },*/
    {
      title: "Tokenomics",
      href: "tokenomics",
      icon: <PieChart className="w-5" />,
    },
    {
      title: "Realms L3",
      href: "network",
      icon: <RealmsL3 className="w-5 fill-current" />,
    },
  ];
  const communityLinks = [
    {
      title: "Frontinus House",
      href: "https://frontinus.house",
      target: "_blank",
      icon: <RealmsL3 className="w-5 fill-current" />,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: <Bookmark className="w-5" />,
    },
    {
      title: "Studios",
      href: "/studios",
      icon: <HammerIcon className="w-5" />,
    },
  ];

  return (
    <div
      id="topnav"
      className={`fixed z-[100] w-full border-b-[3px] bg-background p-3 pl-4 sm:pl-8 md:pl-32`}
    >
      <div className="flex justify-between w-full">
        <Button className="md:hidden" onClick={toggleSidebar}>
          <Menu className="w-8" />
        </Button>
        <Crown className="sm:hidden w-14 group-hover:opacity-0" />
      </div>
      <div className="hidden w-auto justify-end sm:flex">
        <div className="mr-12">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold tracking-wider">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[250px] flex-col py-1.5">
                    {aboutLinks.map((link, index) => {
                      return (
                        <li key={index}>
                          <NavigationMenuLink
                            className="transition-all hover:bg-bright-yellow/10"
                            asChild
                          >
                            <Link
                              href={`/${link.href}`}
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
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold tracking-wider">
                  Community
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[250px] flex-col py-1.5">
                    {communityLinks.map((link, index) => {
                      return (
                        <li key={index}>
                          <NavigationMenuLink
                            className="transition-all hover:bg-bright-yellow/10"
                            asChild
                          >
                            <Link
                              href={`${link.href}`}
                              target={link.target}
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
        <div className="flex flex-col space-y-4 px-1 md:flex-row md:space-x-2 md:space-y-0">
          <LordsDropdown />
          <EthereumLoginButton
            variant={"default"}
            textClass="group-hover:block"
          />
          <StarknetLoginButton
            textClass="group-hover:block"
            variant={"default"}
            openAccount
          />
        </div>
      </div>
    </div>
  );
};
