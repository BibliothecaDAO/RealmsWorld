//import { shortenHex } from "@/utils/utils";
import { Suspense, useEffect, useState } from "react";
import { Account } from "@/app/bridge/Account";
import { useUIContext } from "@/app/providers/UIProvider";
import Bridge from "@/icons/bridge.svg";
import {
  useDisconnect,
  useAccount as useL2Account,
  useConnect as useL2Connect,
  useNetwork,
} from "@starknet-react/core";

//import { AuthShowcase } from "../auth-showcase";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  Sheet,
  SheetContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

import EthereumAccount from "./EthereumAccount";
import { EthereumLoginButton } from "./EthereumLoginButton";
import StarkAccount from "./StarkAccount";
import { StarknetLoginButton } from "./StarknetLoginButton";
import { StarknetLoginModal } from "./StarknetLoginModal";

/*const tabs = [
  {
    name: "Mainnet",
    content: <Account isL1={true} />,
  },

  {
    name: "Starknet",
    content: <Account isL1={false} />,
  },
];*/
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

  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "goerli" : "mainnet";

  const NETWORK_ID = {
    mainnet: 23448594291968334n,
    goerli: 1536727068981429685321n,
  };

  useEffect(() => {
    if (isL2Connected && chainId) {
      if (
        (chainId === NETWORK_ID.goerli && network === "mainnet") ||
        (chainId === NETWORK_ID.mainnet && network === "goerli")
      ) {
        setIsWrongNetwork(true);
      } else {
        setIsWrongNetwork(false);
      }
    } else {
      setIsWrongNetwork(false);
    }
  }, [chain?.id, l2Address, isL2Connected]);

  const { isAccountOpen, toggleAccount } = useUIContext();
  const [open, setOpen] = useState(false);

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
      <div className="my-4 flex w-full flex-col space-y-4 px-1">
        <EthereumLoginButton
          variant={"default"}
          textClass="group-hover:block"
          openAccount
        />
        <StarknetLoginButton
          textClass="group-hover:block"
          variant={"default"}
          buttonClass="w-full"
          openAccount
        />
        <StarknetLoginModal />
      </div>
      <Sheet open={isAccountOpen} onOpenChange={toggleAccount}>
        <SheetContent position={"right"} size={"lg"}>
          <div className="mt-8 flex w-full flex-col items-start gap-y-4">
            <EthereumAccount />
            <StarkAccount />
            <div className="mt-4">
              <h5>Actions</h5>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    //disabled={!realms?.length}
                    className="self-center"
                    size={"lg"}
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
        </SheetContent>
      </Sheet>

      {isWrongNetwork && (
        <Dialog open={isWrongNetwork}>
          <DialogContent close={false} className="z-50 h-72 w-full">
            <DialogHeader>
              <DialogTitle>Wrong Network</DialogTitle>
            </DialogHeader>
            <span>
              Realms.World currently supports{" "}
              <span className="capitalize">{network}</span>, please change the
              connected network in your Starknet wallet, or:
            </span>
            <Button
              variant={"default"}
              size={"lg"}
              className="mt-4"
              onClick={() => onDisconnect()}
            >
              Disconnect
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
