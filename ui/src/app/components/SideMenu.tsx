"use client";

import { Backpack, Map, Boxes, Twitter, Github, X, Compass, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import BibliothecaDAO from "@/icons/BibliothecaBook.svg";
import Discord from "@/icons/discord.svg";
import Link from "next/link";
import { useUIContext } from "../providers/UIProvider";

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
      icon: <Zap />,
    },
  ];

  const social = [
    {
      name: "Discord",
      href: "https://discord.gg/bibliothecadao",
      icon: <Discord className="fill-current w-8" />,
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
      className={`${isSidebarOpen ? "bg-black" : 'hidden'} w-screen lg:flex flex-col fixed z-100 h-screen top-0 p-4  border-r z-20 lg:hover:w-72 transition-all duration-500 lg:w-24 hover:bg-black/80 group`}
    >
      <Button onClick={toggleSidebar} className="block lg:hidden" variant={"outline"}>
        <X />
      </Button>

      <div className="flex flex-col mt-4 space-y-6">
        <Link
          className="flex  text-xl font-semibold  sm:text-2xl font-sans-serif mx-auto"
          href="/"
        >
          <Compass className="self-center w-14 h-8 pl-4 transition-all duration-500 stroke-white" />
          <span className="visible pl-3 transition-all duration-500 opacity-100 sm:invisible group-hover:visible sm:opacity-0 group-hover:opacity-100 group-hover:flex ">
            Atlas
          </span>
        </Link>
        {menu.map((item, index) => {
          return (
            <Button
              className="flex justify-start transition-all duration-450 group"
              key={index}
              onClick={() => handleClick(item.href)}
            >
              <span className=" transition-all duration-450 pl-1">
                {item.icon}{" "}
              </span>

              <span className="visible pl-3 transition-all duration-500 opacity-100 sm:invisible group-hover:visible sm:opacity-0 group-hover:opacity-100 group-hover:flex ">
                {item.name}
              </span>
            </Button>
          );
        })}
      </div>
      <div className="flex flex-col mt-8 space-y-6 sm:mt-auto">
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
