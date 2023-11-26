"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Crown from "@/icons/crown.svg";
import Discord from "@/icons/discord.svg";
import Gamepad from "@/icons/gamepad.svg";
import RWLogo from "@/icons/rw-logo.svg";
import SideHeaderImg from "@/icons/side-header.svg";
import { Backpack, Coins, DoorOpen, Github, Twitter, X } from "lucide-react";

import { useUIContext } from "../providers/UIProvider";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUIContext();

  const router = useRouter();
  const menu = [
    {
      name: "Games",
      href: "/games",
      icon: <Gamepad className="w-8 fill-current" />,
    },
    {
      name: "Collections",
      href: "/collection",
      icon: <Backpack />,
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
      href: "https://discord.gg/realmsworld",
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
        isSidebarOpen ? "bg-dark-green" : "hidden"
      } z-100 bg-dark-green group fixed top-0 z-20 h-screen w-screen flex-col border-[3px] transition-all duration-500 lg:flex lg:w-24 lg:hover:w-72`}
    >
      <Button
        onClick={toggleSidebar}
        className="block lg:hidden "
        variant={"outline"}
      >
        <X />
      </Button>
      <div className="absolute mx-4">
        <SideHeaderImg className=" hidden w-full group-hover:block" />
      </div>
      <Link
        className="font-sans-serif absolute z-20 mx-auto flex w-full justify-center p-4 text-xl font-semibold group-hover:pt-2.5 sm:text-2xl "
        href="/"
        onClick={toggleSidebar}
      >
        <Crown className="w-14 group-hover:hidden" />
        <RWLogo className=" hidden w-[192px] fill-white transition-all duration-500 group-hover:block" />
      </Link>
      <div className="mt-16 h-full w-full border-t-[3px] pb-3 pt-8 group-hover:mt-24 group-hover:pt-0">
        <div className="group-hover:!border-medium-dark-green relative z-10 m-2 mt-0 flex h-full flex-col items-center justify-between border-[3px] border-t-0 border-solid border-transparent px-2">
          <div className="relative z-[3] w-full flex-1 grow self-stretch" />
          <div className="relative z-[2] inline-flex w-full flex-[0_0_auto] flex-col items-start justify-center gap-[17px] pb-[48px] pt-0">
            {menu.map((item, index) => {
              return (
                <Button
                  className="duration-450 group flex w-full justify-start px-2 text-xl font-semibold normal-case transition-all"
                  key={index}
                  variant={"ghost"}
                  onClick={() => {
                    handleClick(item.href);
                    toggleSidebar();
                  }}
                >
                  <span className=" duration-450 pl-1 transition-all">
                    {item.icon}
                  </span>

                  <span className="visible pl-3 opacity-100 transition-all duration-500 group-hover:visible group-hover:flex group-hover:opacity-100 sm:hidden sm:opacity-0 ">
                    {item.name}
                  </span>
                </Button>
              );
            })}
          </div>
          <hr className=" mb-4 w-full border-b-[3px] group-hover:mx-4" />

          <div className="mt-12 flex flex-col space-y-2 sm:mt-auto">
            {social.map((item, index) => {
              return (
                <Button external variant={"ghost"} href={item.href} key={index}>
                  {item.icon}
                </Button>
              );
            })}
          </div>

          <hr className="my-4 w-full border-b-[3px] group-hover:mx-4" />
          <div className="relative z-[3] w-full flex-1 grow self-stretch" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
