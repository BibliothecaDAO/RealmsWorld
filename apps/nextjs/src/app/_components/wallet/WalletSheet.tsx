"use client";

//import { shortenHex } from "@/utils/utils";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Account } from "@/app/bridge/Account";
import { NETWORK_NAME, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import Bridge from "@/icons/bridge.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import {
  useDisconnect,
  useAccount as useL2Account,
  useNetwork,
} from "@starknet-react/core";

import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";
//import { AuthShowcase } from "../auth-showcase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Label,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

import EthereumAccount from "./EthereumAccount";
import StarkAccount from "./StarkAccount";
import { TransactionList } from "./transactions/TransactionList";

export const WalletSheet = () => {
  const {
    address: l2Address,
    isConnected: isL2Connected,
    chainId,
  } = useL2Account();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  const onDisconnect = () => {
    setIsWrongNetwork(false);
    disconnect();
  };

  const NETWORK_ID = {
    mainnet: 23448594291968334n,
    sepolia: 393402133025997798000961n,
  };

  useEffect(() => {
    if (isL2Connected && chainId) {
      if (
        (chainId === NETWORK_ID.sepolia && NETWORK_NAME === "MAIN") ||
        (chainId === NETWORK_ID.mainnet && NETWORK_NAME === "SEPOLIA")
      ) {
        setIsWrongNetwork(true);
      } else {
        setIsWrongNetwork(false);
      }
    } else {
      setIsWrongNetwork(false);
    }
  }, [
    chain.id,
    l2Address,
    isL2Connected,
    chainId,
    NETWORK_ID.sepolia,
    NETWORK_ID.mainnet,
  ]);

  const { isAccountOpen, toggleAccount } = useUIStore((state) => state);

  const tabs = [
    {
      name: "Mainnet",
      content: (
        <Suspense>
          <Account isL1={true} />
        </Suspense>
      ),
    },

    {
      name: "Starknet",
      content: (
        <Suspense>
          <Account isL1={false} />
        </Suspense>
      ),
    },
  ];
  return (
    <>
      <Sheet open={isAccountOpen} onOpenChange={toggleAccount}>
        <SheetContent className={"p-0 sm:max-w-lg"}>
          <SheetHeader>
            <SheetTitle className="p-2 text-xl">Wallet</SheetTitle>
          </SheetHeader>
          <div className="flex w-full flex-col items-start">
            <EthereumAccount />
            <StarkAccount />
            <div className="w-full border-b border-t px-3 py-4">
              <Label>Quick Actions:</Label>
              <div className="mt-1 flex items-center gap-x-2">
                <Button
                  asChild
                  className="self-center rounded-lg"
                  size={"sm"}
                  variant={"outline"}
                >
                  <Link href={"/account/assets"}>My Assets</Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      //disabled={!realms?.length}
                      className="self-center rounded-lg"
                      size={"sm"}
                      variant={"outline"}
                    >
                      <Bridge className="mr-2 w-[25px]" />
                      Bridge Transactions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex h-full min-w-[500px] flex-col sm:max-h-[80%]">
                    <DialogHeader>
                      <h6 className="my-0 py-0">Bridge Transactions</h6>
                    </DialogHeader>
                    <Tabs
                      defaultValue={tabs[0]?.name}
                      className="relative h-full min-h-0"
                    >
                      <TabsList className="absolute my-0 w-full justify-center py-2">
                        {tabs.map((tab, index) => (
                          <TabsTrigger value={tab.name} key={index}>
                            {tab.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {tabs.map((tab, index) => (
                        <TabsContent
                          value={tab.name}
                          key={index}
                          className="h-full pt-14"
                        >
                          <ScrollArea className="h-full">
                            {tab.content}
                          </ScrollArea>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <TransactionList />
          </div>
        </SheetContent>
      </Sheet>

      {isWrongNetwork && (
        <AlertDialog open={isWrongNetwork}>
          <AlertDialogContent className="z-50 h-72 w-full">
            <AlertDialogHeader>
              <AlertDialogTitle>Wrong Network</AlertDialogTitle>
            </AlertDialogHeader>
            <span>
              Realms.World currently supports{" "}
              <span>{CHAIN_IDS_TO_NAMES[SUPPORTED_L2_CHAIN_ID]}</span>, please
              change the connected network in your Starknet wallet, or:
            </span>
            <AlertDialogFooter>
              <AlertDialogAction>
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="mt-4 w-full"
                  onClick={() => onDisconnect()}
                >
                  Disconnect
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
