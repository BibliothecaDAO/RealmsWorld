"use client";

//import { shortenHex } from "@/utils/utils";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Account } from "@/app/bridge/Account";
import { NETWORK_NAME } from "@/constants/env";
import Bridge from "@/icons/bridge.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import {
  useCall,
  useAccount as useL2Account,
  useNetwork,
  useWalletRequest,
} from "@starknet-react/core";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
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

import { WrongNetworkModal } from "../modal/WrongNetworkModal";
import EthereumAccount from "./EthereumAccount";
import StarkAccount from "./StarkAccount";
import { TransactionList } from "./transactions/TransactionList";

export const WalletSheet = () => {
  const {
    account,
    address: l2Address,
    isConnected: isL2Connected,
    chainId,
  } = useL2Account();
  const { chain } = useNetwork();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  const NETWORK_ID = {
    mainnet: 23448594291968334n,
    sepolia: 393402133025997798000961n,
  };

  const { request, data } = useWalletRequest({
    type: "wallet_requestChainId",
  });

  const isStarknetWrongNetwork =
    isL2Connected && data !== undefined && BigInt(data) !== chain.id;

  // TODO refactor back to default Chain Id when starknet-react supports
  useEffect(() => {
    if (account?.address !== undefined) {
      request();
    }
  }, [account?.address, request]);

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
              <div className="mt-1 flex items-center gap-x-2">
                <Button
                  asChild
                  className="self-center"
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => toggleAccount()}
                >
                  <Link href={"/account/assets"}>My Assets</Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      //disabled={!realms?.length}
                      className="self-center"
                      size={"sm"}
                      variant={"outline"}
                    >
                      <Bridge className="mr-2 w-[25px]" />
                      Lords Bridge TX
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

      {isStarknetWrongNetwork && <WrongNetworkModal />}
    </>
  );
};
