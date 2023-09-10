"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Discord from "@/icons/discord.svgr";
import RWLogo from "@/icons/rw-logo.svgr";
import {
  Backpack,
  Coins,
  DoorOpen,
  Github,
  Map,
  Twitter,
  X,
} from "lucide-react";

import { useUIContext } from "../providers/UIProvider";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUIContext();

  const router = useRouter();
  const menu = [
    {
      name: "Collections",
      href: "/collection",
      icon: <Backpack />,
    },
    {
      name: "Games",
      href: "/games",
      icon: <Map />,
    },
    {
      name: "Bridge",
      href: "/bridge",
      icon: <DoorOpen />,
    },
    {
      name: "Staking",
      href: "/staking",
      icon: <Coins />,
    },
  ];

  const social = [
    {
      name: "Discord",
      href: "https://discord.gg/bibliothecadao",
      icon: <Discord className="w-8 fill-current" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/lootrealms?lang=en",
      icon: <Twitter />,
    },
    {
      name: "Github",
      href: "https://github.com/BibliothecaDAO",
      icon: <Github />,
    },
  ];

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "bg-black" : "hidden"
      } z-100 group fixed top-0 z-20 h-screen w-screen flex-col  border-r p-4 transition-all duration-500 hover:bg-black/80 lg:flex lg:w-24 lg:hover:w-72`}
    >
      <Button
        onClick={toggleSidebar}
        className="block lg:hidden"
        variant={"outline"}
      >
        <X />
      </Button>

      <div className="mt-4 flex flex-col space-y-6">
        <Link
          className="font-sans-serif  mx-auto flex text-xl font-semibold sm:text-2xl"
          href="/"
        >
          <RWLogo className="h-[28px] w-[67px] fill-white transition-all duration-500 group-hover:scale-150" />
          {/*<Compass className="self-center w-14 h-8 pl-4 transition-all duration-500 stroke-white" />
          <span className="visible pl-3 transition-all duration-500 opacity-100 sm:invisible group-hover:visible sm:opacity-0 group-hover:opacity-100 group-hover:flex ">
            Atlas
    </span>*/}
        </Link>
        {menu.map((item, index) => {
          return (
            <Button
              className="duration-450 group flex justify-start transition-all"
              key={index}
              onClick={() => handleClick(item.href)}
            >
              <span className=" duration-450 pl-1 transition-all">
                {item.icon}{" "}
              </span>

              <span className="visible pl-3 opacity-100 transition-all duration-500 group-hover:visible group-hover:flex group-hover:opacity-100 sm:invisible sm:opacity-0 ">
                {item.name}
              </span>
            </Button>
          );
        })}
      </div>
      <div className="mt-8 flex flex-col space-y-6 sm:mt-auto">
        {social.map((item, index) => {
          return (
            <Button external href={item.href} key={index}>
              {item.icon}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
