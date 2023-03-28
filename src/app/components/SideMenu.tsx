"use client";

import { Backpack, Map, Boxes, Twitter, Github, X } from "lucide-react";
import { Button } from "./ui/button";
import { useUIContext } from "../providers/UIProvider";
import { useRouter } from "next/navigation";
import BibliothecaDAO from "../../icons/BibliothecaBook.svg";

const Sidebar = () => {
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useUIContext();
  const menu = [
    {
      name: "Collections",
      href: "/collection",
      icon: <Backpack />,
    },
    // {
    //   name: "AMM",
    //   href: "/collection/0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    //   icon: <Boxes />,
    // },
    {
      name: "Games",
      href: "/games",
      icon: <Map />,
    },
  ];

  const social = [
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
    toggleSidebar();
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "" : "hidden"
      } w-screen lg:flex flex-col fixed z-100 h-screen top-0 p-4 bg-black/90 lg:bg-black/30 z-20 lg:hover:w-72 transition-all duration-300 lg:w-24 hover:bg-black/80 group`}
    >
      <Button
        className="block lg:hidden"
        onClick={() => toggleSidebar()}
        variant={"outline"}
      >
        <X />
      </Button>

      <div className="flex flex-col mt-4 space-y-6">
        {menu.map((item, index) => {
          return (
            <Button
              className="flex justify-start transition-all duration-450 group"
              key={index}
              onClick={() => handleClick(item.href)}
            >
              <span className="mr-auto transition-all duration-450">
                {item.icon}{" "}
              </span>

              <span className="visible pl-3 transition-all duration-150 opacity-100 sm:invisible group-hover:visible sm:opacity-0 group-hover:opacity-100 group-hover:flex ">
                {item.name}
              </span>
            </Button>
          );
        })}
      </div>
      <div className="flex flex-col mt-8 space-y-6 sm:mt-auto">
        {social.map((item, index) => {
          return (
            <Button href={item.href} key={index}>
              {item.icon}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
