"use client";

import Link from "next/link";
import Profile from "./LoginButton";
import { Compass, Menu } from "lucide-react";
import { useUIContext } from "../providers/UIProvider";
import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion"
import { useState } from "react";

export const TopNav = () => {
  const { toggleSidebar } = useUIContext();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <div id="topnav" className={`fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-[100] ${isScrolled ? 'bg-opacity-30 backdrop-blur-md bg-black' : ''}`}>
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