import { shortenHex } from "@/functions/utils";
import { Button } from "@/app/components/ui/button";

import { SheetTrigger, SheetContent, Sheet } from "../ui/sheet";
import EthereumLogin from "./EthereumLogin";
import { EthereumLoginButton } from "./EthereumLoginButton";
import StarkLogin from "./StarkLogin";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  useConnectors,
  useAccount as useL2Account,
  useNetwork,
} from "@starknet-react/core";
import { useEffect, useState } from "react";

import { useConnect, useAccount as useL1Account } from "wagmi";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { Account } from "@/app/bridge/Account";
import { useUIContext } from "@/app/providers/UIProvider";

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
    }
  }, [chain?.id, l2Address, isL2Connected]);

  const { isAccountOpen, toggleAccount } = useUIContext();

  return (
    <>
      <div className="flex space-x-2">
        <EthereumLoginButton openAccount />
        <Button variant={"outline"} className="flex gap-x-2">
          {l2Address && isConnected ? (
            <>
              <StarknetLogo className="mx-2 w-5 h-5" />
              {shortenHex(l2Address)}
            </>
          ) : (
            <span className="flex">
              <StarknetLogo className="mx-2 w-5 h-5" />
              Connect
            </span>
          )}
        </Button>
      </div>
      <Sheet open={isAccountOpen} onOpenChange={toggleAccount}>
        <SheetContent position={"right"} size={"lg"}>
          <div className="flex-col gap-y-4 flex w-full mt-8 h-auto">
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
