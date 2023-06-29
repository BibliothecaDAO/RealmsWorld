"use client";


import EthereumLogin from "./wallet/EthereumLogin";
import StarkLogin from "./wallet/StarkLogin";
import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";
import { shortenHex } from "@/functions/utils";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { Account } from "../bridge/Account";
import Link from "next/link";
import { Compass, Menu } from "lucide-react";
import { useUIContext } from "../providers/UIProvider";

export const TopNav = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const { address: l1Address, isConnected } = useL1Account();
  const { address: l2Address } = useL2Account();

  const { isSidebarOpen, toggleSidebar } = useUIContext();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  return (
    <div
      id="topnav"
      className={`fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-[100] ${isScrolled ? "backdrop-blur-sm" : ""
        }`}
    >
      <div className="flex justify-between sm:justify-end ">
        <Button className={"flex sm:hidden"} onClick={toggleSidebar}><Menu className="w-8" /></Button>

        <Link
          className="flex sm:hidden self-center text-xl font-semibold  sm:text-2xl font-sans-serif "
          href="/"
        >
          <Compass className="self-center w-12 h-8 pl-3 transition-all duration-500" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="dark:bg-opacity-60">
              {!l1Address && !l2Address ? (
                "Connect"
              ) : (
                <div className="flex gap-x-2">
                  {l1Address && isConnected && (
                    <>
                      <EthereumLogo className="w-5 h-5 -mr-1" />
                      {shortenHex(l1Address)}
                    </>
                  )}

                  {l2Address && (
                    <>
                      <StarknetLogo className="ml-2 w-5 h-5" />
                      {shortenHex(l2Address)}
                    </>
                  )}
                </div>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent position={'right'} size={'lg'}>
            <div className="flex-col gap-y-4 flex w-full mt-8">
              <EthereumLogin />
              <StarkLogin />
              <Account isL1={true} />
              <Account isL1={false} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
