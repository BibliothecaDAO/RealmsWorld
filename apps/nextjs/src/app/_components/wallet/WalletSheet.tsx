//import { shortenHex } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Account } from "@/app/bridge/Account";
//import { Account } from "@/app/bridge/Account";
import { useUIContext } from "@/app/providers/UIProvider";
import {
  useConnectors,
  useAccount as useL2Account,
  useNetwork,
} from "@starknet-react/core";
import { useConnect, useAccount as useL1Account } from "wagmi";

import { AuthShowcase } from "../auth-showcase";
import { Sheet, SheetContent } from "../ui/sheet";
import EthereumLogin from "./EthereumLogin";
import { EthereumLoginButton } from "./EthereumLoginButton";
import StarkLogin from "./StarkLogin";
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
  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
  const { address: l1Address, isConnected } = useL1Account();
  const { address: l2Address, isConnected: isL2Connected } = useL2Account();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { chain } = useNetwork();
  const { disconnect } = useConnectors();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsDefinitelyConnected(true);
    } else {
      setIsDefinitelyConnected(false);
    }
  }, [l1Address]);

  const onDisconnect = () => {
    setIsWrongNetwork(false);
    disconnect();
  };

  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "goerli" : "mainnet";

  const NETWORK_ID = {
    mainnet: "0x534e5f4d41494e",
    goerli: "0x534e5f474f45524c49",
  };

  useEffect(() => {
    if (isL2Connected) {
      if (
        (chain?.id === NETWORK_ID.goerli && network === "mainnet") ||
        (chain?.id === NETWORK_ID.mainnet && network === "goerli")
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
  const tabs = [
    {
      name: "Mainnet",
      content: <Account isL1={true} />,
    },

    {
      name: "Starknet",
      content: <Account isL1={false} />,
    },
  ];
  return (
    <>
      <div className="flex space-x-2">
        <EthereumLoginButton openAccount />
        <StarknetLoginButton />
        <StarknetLoginModal />
      </div>
      <Sheet open={isAccountOpen} onOpenChange={toggleAccount}>
        <SheetContent position={"right"} size={"lg"}>
          <div className="mt-8 flex h-auto w-full flex-col gap-y-4">
            <EthereumLogin />
            <StarkLogin />

            <Tabs defaultValue={tabs[0].name}>
              <TabsList className="justify-center">
                {tabs.map((tab, index) => (
                  <TabsTrigger value={tab.name} key={index}>
                    {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab, index) => (
                <TabsContent value={tab.name} key={index}>
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {isWrongNetwork && (
        <Dialog open={isWrongNetwork}>
          <DialogContent className="w-full">
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
