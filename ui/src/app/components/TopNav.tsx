"use client";

import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useUIContext } from "../providers/UIProvider";
import { WalletSheet } from "./wallet/WalletSheet";

export const TopNav = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const { toggleSidebar } = useUIContext();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <div
      id="topnav"
      className={`fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-[100] ${
        isScrolled ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className="flex justify-between sm:justify-end ">
        <Button className={"flex sm:hidden"} onClick={toggleSidebar}>
          <Menu className="w-8" />
        </Button>
        <WalletSheet />
        {/* <Link
          className="flex sm:hidden self-center text-xl font-semibold  sm:text-2xl font-sans-serif "
          href="/"
        >
          <Compass className="self-center w-12 h-8 pl-3 transition-all duration-500" />
    </Link>*/}
      </div>
    </div>
  );
};
