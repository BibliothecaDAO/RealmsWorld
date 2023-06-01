"use client";

import Link from "next/link";
import EthereumLogin from "./wallet/EthereumLogin";
import StarkLogin from "./wallet/StarkLogin";
import { Compass, Menu, Wallet } from "lucide-react";
import { useUIContext } from "@/app/providers/UIProvider";
import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export const TopNav = () => {
  const { toggleSidebar } = useUIContext();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <div
      id="topnav"
      className={`fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-[100] ${
        isScrolled ? "bg-opacity-30 backdrop-blur-sm bg-black" : ""
      }`}
    >
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
        <Sheet>
          <SheetTrigger>
            <Button>
              <Wallet />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Wallets</SheetTitle>
            <div className="flex-col gap-y-4 flex w-full">
              <div className="grid grid-cols-4 uppercase justify-items-center align-items-center space-x-3">
                <div className="col-span-2"></div>
                <div>Eth</div>
                <div>Lords</div>
              </div>
              <EthereumLogin />
              <StarkLogin />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
