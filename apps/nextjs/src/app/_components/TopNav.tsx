"use client";

import Link from "next/link";
import Bookmark from "@/icons/bookmark.svg";
import PieChart from "@/icons/pie-chart.svg";
import RealmsL3 from "@/icons/realms_l3.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { HammerIcon, Menu, ShieldQuestion } from "lucide-react";

import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@realms-world/ui";

import { WalletSheet } from "./wallet/WalletSheet";

export const TopNav = () => {
  //{ scrollY } = useScroll();
  //const [isScrolled, setIsScrolled] = useState(false);

  const { toggleSidebar } = useUIStore((state) => state);

  /*useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });*/

  const aboutLinks = [
    {
      title: "What is Realms.World",
      href: "info",
      icon: <ShieldQuestion className="w-5" />,
    },
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
      icon: <RealmsL3 className="w-5 fill-current" />,
    },
    {
      title: "Blog",
      href: "blog",
      icon: <Bookmark className="w-5" />,
    },
    {
      title: "Studios",
      href: "studios",
      icon: <HammerIcon className="w-5" />,
    },
  ];

  return (
    <div
      id="topnav"
      className={`fixed z-[100] w-full border-b-[3px] bg-background p-3 pl-4 sm:pl-8 md:pl-32`}
    >
      <div className="flex justify-between">
        <Button className="md:hidden" onClick={toggleSidebar}>
          <Menu className="w-8" />
        </Button>
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <WalletSheet />
      </div>
    </div>
  );
};
