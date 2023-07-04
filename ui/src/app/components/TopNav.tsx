"use client";

import EthereumLogin from "./wallet/EthereumLogin";
import StarkLogin from "./wallet/StarkLogin";
import { Button } from "./ui/button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";
import { shortenHex } from "@/functions/utils";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { Account } from "../bridge/Account";
import Link from "next/link";
import { Compass, Menu } from "lucide-react";
import { useUIContext } from "../providers/UIProvider";
import { Tabs } from "@/app/components/Tabs";

export const TopNav = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
  const { address: l1Address, isConnected } = useL1Account();
  const { address: l2Address, status } = useL2Account();

  useEffect(() => {
    if (isConnected) {
      setIsDefinitelyConnected(true);
    } else {
      setIsDefinitelyConnected(false);
    }
  }, [l1Address]);

  const { toggleSidebar } = useUIContext();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0);
  });

  const tabs = [
    {
      name: "Mainnet",
      content: <Account isL1={true} />
    },

    {
      name: "Starknet",
      content: <Account isL1={false} />
    },
  ]

  return (
    <div
      id="topnav"
      className={`fixed w-full p-3 pl-4 sm:pl-8 lg:pl-32 z-[100] ${isScrolled ? "backdrop-blur-sm" : ""
        }`}
    >
      <div className="flex justify-between sm:justify-end ">
        <Button className={"flex sm:hidden"} onClick={toggleSidebar}>
          <Menu className="w-8" />
        </Button>

        <Link
          className="flex sm:hidden self-center text-xl font-semibold  sm:text-2xl font-sans-serif "
          href="/"
        >
          <Compass className="self-center w-12 h-8 pl-3 transition-all duration-500" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex space-x-2">
              <Button variant={'outline'} className="flex gap-x-2">
                {l1Address && isDefinitelyConnected ? (
                  <>
                    <EthereumLogo className="mx-2 w-5 h-5" />
                    {shortenHex(l1Address)}
                  </>
                ) : <span className="flex"><EthereumLogo className="mx-2 w-5 h-5" />Connect</span>}
              </Button>
              <Button variant={'outline'} className="flex gap-x-2">
                {l2Address && status == 'connected' ? (
                  <>
                    <StarknetLogo className="mx-2 w-5 h-5" />
                    {shortenHex(l2Address)}
                  </>
                ) : <span className="flex"><StarknetLogo className="mx-2 w-5 h-5" />Connect</span>}
              </Button>
            </div>

          </SheetTrigger>
          <SheetContent position={'right'} size={'lg'}>
            <div className="flex-col gap-y-4 flex w-full mt-8 h-auto">
              <EthereumLogin />
              <StarkLogin />
              <Tabs tabs={tabs} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
