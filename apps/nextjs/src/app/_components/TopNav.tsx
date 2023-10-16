"use client";

import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
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
      className={`fixed z-[100] w-full p-3 pl-4 sm:pl-8 lg:pl-32 ${
        isScrolled ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className="flex justify-between sm:justify-end ">
        <Button className={"flex sm:hidden"} onClick={toggleSidebar}>
          <Menu className="w-8" />
        </Button>
        <WalletSheet />
      </div>
    </div>
  );
};
