"use client";

import Link from "next/link";
import Profile from "./LoginButton";
import { Compass, Menu } from "lucide-react";
import { useUIContext } from "../providers/UIProvider";
import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion"

export const TopNav = () => {
  const { toggleSidebar } = useUIContext();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("scrolling")
    if (latest > 0) {
      document.querySelector("#topnav")?.classList.add("bg-opacity-30", "backdrop-blur-md", "bg-black");
    } else if (latest === 0) {
      document.querySelector("#topnav")?.classList.remove("bg-opacity-30", "backdrop-blur-md", "bg-black");
    }
  });

  return (
    <div id="topnav" className="fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-[100]">
      <div className="flex justify-between ">
        <Button className="lg:hidden" onClick={toggleSidebar}>
          <Menu className="self-center" />
        </Button>

        <Link
          className="flex self-center text-xl font-semibold sm:mr-3 sm:text-2xl font-sans-serif"
          href="/"
        >
          <Compass className="self-center mr-3" />
          <span className="hidden sm:block">Atlas </span>
        </Link>
        <Profile />
      </div>
    </div>
  );
};